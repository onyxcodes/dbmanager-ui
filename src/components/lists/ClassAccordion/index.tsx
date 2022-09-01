import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EntityAccordion from '../../commons/EntityAccordion';

import { StoreState } from '../../../store';
import { Button, Space, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataModelState, loadClass } from '../../../features/dataModel'
import StatefulLink from '../../commons/StatefulLink';

require('antd/lib/spin/style');

interface ClassAccordionProps {
    databaseName: string | undefined;
    classList: DataModelState['classList']
}
const ClassAccordion = ( props:ClassAccordionProps ) => {
    const { databaseName, classList } = props;
    const dispatch = useDispatch();
    const text = <span>Placeholder</span>;
    const [ panelContent, setPanelContent ] = React.useState(text)
    // TODO: replicate behaviour also on first load (it memorizes last selected tab)
    const onChange = (key: string | string[], data: { name: string }[]) => {
        // TODO: load info data on request and dispatch action to add it to corresponding
        // obj in classList?
        if (key && databaseName) {
            for ( const singleKey of [...key] ) {
                const className = data[Number(singleKey)].name;
                // console.log("Got selected element(s):", data[Number(singleKey)]);
                doLoadClass(databaseName, className);
            }
        }
    };

    const getExtra = (panelName: string) => <Space>
        <StatefulLink to={`db/${databaseName}/class/${panelName}`}> 
            <Button onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            // event.stopPropagation();
            }} type="text" icon={<EditOutlined />} />
        </StatefulLink>
       
        <Button onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
            }} type="text" danger={true} icon={<DeleteOutlined />} />
    </Space> 

    const doLoadClass = React.useCallback( ( 
        databaseName: string,
        className: string
    ) => {
        dispatch(loadClass({
            dbName: databaseName,
            className: className
        }))
    }, [dispatch]);

    const classData = useSelector<StoreState, DataModelState['currentClass']>(s => s.dataModel.currentClass);
    if (classData) debugger;
    React.useEffect( () => {
        if (classData) setPanelContent(
            classData.pending ? <Spin />
            : <ul>
                <li>Name: {classData.name}</li>
                <li>Description: {classData.description}</li>
            </ul>
            
        )
    }, [classData]);

    return(
        <EntityAccordion getExtra={getExtra} onChange={(key) => onChange(key, classList)} injectedContent={panelContent} list={classList}/>
    )
}

export default ClassAccordion;