import React from 'react';
import ViewHeader from '../../components/headers/ViewHeader';
import { Button, Layout, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store';
import { DataModelState, loadClass } from '../../features/dataModel';

const ClassView = () => {
    const dispatch = useDispatch();
    const { databaseName, className } = useParams();

    React.useEffect( () => {
        if ( databaseName && className ) dispatch(loadClass({
            dbName: databaseName,
            className: className
        }))
    }, [databaseName, className])
    const classData = useSelector<StoreState, DataModelState['currentClass']>(s => s.dataModel.currentClass);

    return (<>
        <ViewHeader 
            title={`Class: ${className}`}
            actions={[
                <Button onClick={() => console.log('Requested attribute refresh')}>Refresh</Button>,
                // <Button onClick={() => refreshAttributes()}>Refresh</Button>,
                <Button type='primary' onClick={() => console.log('Requested adding new attribute')}>Add attribute</Button>
                // <Button type='primary' onClick={() => prompt(true)}>Add attribute</Button>
            ]}
        />
        <Layout.Content className='classView' style={{ padding: '25px 50px' }}>
            {classData.pending ? <Spin />
            : <ul>
                <li>Name: {classData.name}</li>
                <li>Description: {classData.description}</li>
            </ul>}
        </Layout.Content>
        {/* {wrapper} */}
    </>)
}

export default ClassView;