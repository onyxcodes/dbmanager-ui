import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../../store';
import { DataModelState, getDatabaseList, addDatabase } from '../../features/dataModel';
import ViewHeader from '../../components/headers/ViewHeader';

import { Button, FormInstance, Input, Layout, Form } from 'antd';
import DatabaseAccordion from '../../components/lists/DatabaseAccordion';

import usePromptNotify from '../../components/commons/usePromptNotify'

require('antd/lib/layout/style');
require('antd/lib/form/style');
require('antd/lib/input/style');


interface ListDabaseProps {
    //
}
const ListDatabase = (props: ListDabaseProps) => {
    const dispatch = useDispatch();
    const databaseList = useSelector<StoreState, DataModelState['databaseList']>(s => s.dataModel.databaseList);

    React.useEffect( () => {
        dispatch(getDatabaseList(true));
    }, [databaseList.length]);

    // callback to refresh database list
    const refreshDatabases = React.useCallback( () => {
        return dispatch(getDatabaseList(true))
    }, [dispatch]);

    const doAddDatabase = React.useCallback( (form: FormInstance) => {
        let value = form.getFieldValue("name");
        return dispatch(addDatabase(value))
    }, [dispatch]);

    const isAddingDatabase = useSelector<StoreState, StoreState['dataModel']['databaseAddition']['pending']>(s => s.dataModel.databaseAddition.pending);

    const { prompt, wrapper} = usePromptNotify(
        {
            title: 'Add database',
            confirmLabel: 'Add',
            items: <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input database name!' }]}
            >
                <Input/>   
            </Form.Item>
        },
        {
            title: 'Adding database',
            description: 'Further details about the context of this alert.'
        },
        doAddDatabase, isAddingDatabase
    );

    return(
        <>
            <ViewHeader 
                title='Database list'
                actions={[
                    <Button onClick={() => refreshDatabases()}>Refresh</Button>,
                    <Button type='primary' onClick={() => prompt(true)}>Add database</Button>
                ]}
            />
            <Layout.Content className='listDatabase' style={{ padding: '25px 50px' }}>
                <DatabaseAccordion databaseList={databaseList}/>
            </Layout.Content>
            {wrapper}
        </>
    )
}

export default ListDatabase;