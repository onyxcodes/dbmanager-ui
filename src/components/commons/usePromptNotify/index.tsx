import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Spin, Form, FormInstance } from 'antd'

import FormModal from '../FormModal';

require('antd/lib/spin/style');
require('antd/lib/alert/style');


const customValidator = async (form: FormInstance) => {
    if (form) {
        try {
            let res = await form.validateFields(["name"]);
            return true;
        } catch (e) {
            // means some field were not filled correctly
            return false;
        }
    } 
}

// TODO: consider allowing customValidator as arg
const usePromptNotify = (
    formConfig: {
        title: string;
        confirmLabel?: string;
        items: JSX.Element | JSX.Element[]
    },
    alertConfig: {
        title: string;
        description?: string;
    },
    performAction: (arg: FormInstance) => void,
    isPerformingOp: boolean
) => {
    const dispatch = useDispatch();
    const formRef = React.createRef<FormInstance>();
	const [ isPrompting, prompt ] = React.useState(false);
    const [ isNotifying, notify ] = React.useState(false);
    const [ isOpResultDelayed, delayOpResult ] = React.useState(false);
    // TODO: consider using directly the arg
    // const isPerformingOp = opStatus;

    React.useEffect( () => {
        // when action is pending set delay flag of action to true
        if (isPerformingOp) delayOpResult(true);
        // when action is fulfilled and delay flag of action is true
        // start a timer of 2 second before resetting delay flag
        else if (!isPerformingOp && isOpResultDelayed) setTimeout( () => delayOpResult(false), 2000);

        // close when action is fulfilled ( pending = false )
        if (!isPerformingOp) prompt(false); 
    }, [isPerformingOp]); // avoid adding `isOpResultDelayed` as a dependency since it's setted to true directly here

    // when actions is pending and database additional alert is not showing, start showing it
    React.useEffect( () => {
        if (isPerformingOp && !isNotifying) notify(true);
        // when delay flag is false (see above specific case) and alert is already showing
        // start a timeout that will hide the database addition alert
        else if (!isOpResultDelayed && isNotifying) {
            setTimeout( () => notify(false), 2000);
        }
    }, [isPerformingOp, isOpResultDelayed, isNotifying]);

    const validateAndPerform = React.useCallback( async () => {
        if ( formRef.current && await customValidator(formRef.current) ) {
            // get name field valiue
            // let value = formRef.current.getFieldValue("name");
            // TODO: to make it more general, change the variables reading in the action
            performAction(formRef.current);
        } else console.log("Check fields with error");
    }, [dispatch, formRef]);

    const wrapper = <>
        {isNotifying && <Spin spinning={isOpResultDelayed}>
            <Alert
                style={{ width: '50%' }}
                message={alertConfig.title}
                description={alertConfig.description}
                type={ isOpResultDelayed ? "info" : 'success'}
            />
        </Spin>}
        
        <FormModal
            title={formConfig.title}
            visible={isPrompting}
            onCancel={() => prompt(false)}
            onConfirm={validateAndPerform}
            confirmLabel={formConfig.confirmLabel}
            form={<Form ref={formRef}>
                {formConfig.items}
            </Form>}
        />
    </>

    const result = {
        prompt: prompt,
        wrapper: wrapper,
        // TODO: may be needed for advanced validations/loading?
        // i.e.: a field that depends on another field etc
        // form: formRef 
    };

    return result;
}

export default usePromptNotify