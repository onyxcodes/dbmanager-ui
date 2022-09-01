import React from 'react';
import ViewHeader from '../../components/headers/ViewHeader';
import { Button, Layout, Spin, Form, FormInstance, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store';
import { DataModelState, loadDatabase, addClass, getClassList } from '../../features/dataModel';
import { useParams } from 'react-router-dom';
import usePromptNotify from '../../components/commons/usePromptNotify'
import ClassAccordion from '../../components/lists/ClassAccordion';


interface DatabaseViewProps {
    // name: string;
}
const DatabaseView = ( props:DatabaseViewProps ) => {
    const dispatch = useDispatch();
    const { databaseName } = useParams();
    const databaseData = useSelector<StoreState, DataModelState['currentDatabase']>(s => s.dataModel.currentDatabase);
    const classList = useSelector<StoreState, DataModelState['classList']>( s => s.dataModel.classList );

    if (classList) debugger;

    React.useEffect( () => {
        databaseName && dispatch(getClassList(databaseName));
    }, [databaseName, classList.length]);

    // callback to refresh database list
    const refreshDatabases = React.useCallback( () => {
        return databaseName && dispatch(getClassList(databaseName));
    }, [databaseName, dispatch]);
    
    React.useEffect( () => {
        databaseName && dispatch(loadDatabase(databaseName))
    }, [databaseName]);

    const doAddClass = React.useCallback( (form: FormInstance) => {
        if ( databaseName ) {
            let value = form.getFieldValue("name");
            return dispatch(addClass({className: value, dbName: databaseName}))
        }
    }, [dispatch, databaseName]);

    const isAddingClass = useSelector<StoreState, StoreState['dataModel']['classAddition']['pending']>(s => s.dataModel.classAddition.pending);

    const { prompt, wrapper} = usePromptNotify(
        {
            title: 'Add class',
            confirmLabel: 'Add',
            items: <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input class name!' }]}
            >
                <Input/>   
            </Form.Item>
        },
        {
            title: 'Adding class',
            description: 'Further details about the context of this alert.'
        },
        doAddClass, isAddingClass
    );

    // TODO: realize ClassAccordion component,extendend from EntityAccordion
    // TODO: therefore make the action (async) for loading classs
    return(
        <>
            <ViewHeader 
                title={databaseName ? 'Database: '.concat(databaseName) : 'Database'}
                actions={[
                    <Button onClick={() => refreshDatabases()}>Refresh</Button>,
                    <Button type='primary' onClick={() => prompt(true)}>Add class</Button>
                ]}
            />
            <Layout.Content className='listDatabase' style={{ padding: '25px 50px' }}>
                { databaseData.pending ? <Spin />
            : <ul>
                <li>Document count: {databaseData.info?.doc_count}</li>
                <li>Update sequential: {databaseData.info?.update_seq}</li>
            </ul>}
            <ClassAccordion databaseName={databaseName} classList={classList}/>
            </Layout.Content>
            {wrapper}
        </>
    )
}

export default DatabaseView;