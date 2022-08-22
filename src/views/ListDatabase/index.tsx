import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../../store';
import getDatabaseList from '../../features/dataModel/getDatabaseList';
import addDatabase from '../../features/dataModel/addDatabase';
import ViewHeader from '../../components/headers/ViewHeader';

import { Button, Form, FormInstance, Input, Layout, Modal, Spin, Alert } from 'antd';

require('antd/lib/modal/style');
require('antd/lib/layout/style');
require('antd/lib/form/style');
require('antd/lib/input/style');
require('antd/lib/spin/style');
require('antd/lib/alert/style');

interface ListDabaseProps {
    //
}

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

const ListDatabase = (props: ListDabaseProps) => {
    const dispatch = useDispatch();
	const [ addDBIsVisbile, setAddDBVisible ] = React.useState(false);
    const formRef = React.createRef<FormInstance>();
    const [ databaseAdditionAlertVisibile, showDatabaseAdditionAlert ] = React.useState(false);
    const [ isAddingDatabaseDelayed, delayIsAddingDatabase ] = React.useState(false);

	const validateAndAddDatabase = React.useCallback( async () => {
        if ( formRef.current && await customValidator(formRef.current) ) {
            // get name field valiue
            let value = formRef.current.getFieldValue("name");
            doAddDatabase(value);
        } else console.log("Check fields with error");
    }, [dispatch, formRef])

    const databaseList = useSelector<StoreState, StoreState['dataModel']['databaseList']>(s => s.dataModel.databaseList);

    const isAddingDatabase = useSelector<StoreState, StoreState['dataModel']['databaseAddition']['pending']>(s => s.dataModel.databaseAddition.pending);

    React.useEffect( () => {
        // when action is pending set delay flag of action to true
        if (isAddingDatabase) delayIsAddingDatabase(true);
        // when action is fulfilled and delay flag of action is true
        // start a timer of 2 second before resetting delay flag
        else if (!isAddingDatabase && isAddingDatabaseDelayed) setTimeout( () => delayIsAddingDatabase(false), 2000);

        // close when action is fulfilled ( pending = false )
        if (!isAddingDatabase) closeDatabaseAdditionModal(); 
    }, [isAddingDatabase]); // avoid adding `isAddingDatabaseDelayed` as a dependency since it's setted to true directly here

    // when actions is pending and database additional alert is not showing, start showing it
    React.useEffect( () => {
        if (isAddingDatabase && !databaseAdditionAlertVisibile) showDatabaseAdditionAlert(true);
        // when delay flag is false (see above specific case) and alert is already showing
        // start a timeout that will hide the database addition alert
        else if (!isAddingDatabaseDelayed && databaseAdditionAlertVisibile) {
            setTimeout( () => showDatabaseAdditionAlert(false), 2000);
        }
    }, [isAddingDatabase, isAddingDatabaseDelayed, databaseAdditionAlertVisibile]);


    React.useEffect( () => {
        dispatch(getDatabaseList(true));
    }, [databaseList.length]);

    // callback to refresh database list
    const refreshDatabases = React.useCallback( () => {
        return dispatch(getDatabaseList(true))
    }, [dispatch]);

    // callback to add a database, given a name
    const doAddDatabase = React.useCallback( (value: string) => {
        return dispatch(addDatabase(value))
    }, [dispatch, formRef]);

    const closeDatabaseAdditionModal = React.useCallback( () => {
        setAddDBVisible(false);
    }, [formRef.current]);

    return(
        <>
            <ViewHeader 
                title='Database list'
                actions={[
                    <Button onClick={() => refreshDatabases()}>Refresh</Button>,
                    <Button type='primary' onClick={() => setAddDBVisible(true)}>Add database</Button>
                ]}
            />
            <Layout.Content className='listDatabase' style={{ padding: '25px 50px' }}>
                
                List some databases!
            </Layout.Content>
            {databaseAdditionAlertVisibile && <Spin spinning={isAddingDatabaseDelayed}>
                <Alert
                    style={{ width: '50%' }}
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type={ isAddingDatabaseDelayed ? "info" : 'success'}
                />
            </Spin>}
            <Modal 
                title='Add database'
                visible={addDBIsVisbile}
                onCancel={() => setAddDBVisible(false)}
                footer={
                <>
                    <Button 
                        onClick={() => setAddDBVisible(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={validateAndAddDatabase}
                        type="primary" 
                        htmlType="submit"
                    >
                        Add
                    </Button>
                </>
                }
            >
                <Form ref={formRef}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input database name!' }]}
                    >
                        <Input/>   
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ListDatabase;