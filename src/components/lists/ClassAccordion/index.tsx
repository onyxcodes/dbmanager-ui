import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EntityAccordion from '../../commons/EntityAccordion';

import { StoreState } from '../../../store';
import { Button, Space, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import StatefulLink from '../../commons/StatefulLink';

require('antd/lib/spin/style');

interface DatabaseAccordionProps {
    classList: StoreState['dataModel']['classList']
}
const ClassAccordion = ( props:DatabaseAccordionProps ) => {
    const { classList } = props;
    const dispatch = useDispatch();
    const text = <span>Placeholder</span>;
    const [ panelContent, setPanelContent ] = React.useState(text)
    // TODO: replicate behaviour also on first load (it memorizes last selected tab)
    const onChange = (key: string | string[], data: { name: string }[]) => {
        // TODO: load info data on request and dispatch action to add it to corresponding
        // obj in classList?
        if (key) {
            for ( const singleKey of [...key] ) {
                // console.log("Got selected element(s):", data[Number(singleKey)]);
                // doLoadClass(singleKey);
            }
        }
    };

    const getExtra = (panelName: string) => <Space>
        <StatefulLink to={"db/".concat(panelName)}> 
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

    const doLoadClass = React.useCallback( ( databaseName: string ) => {
        // dispatch(loadDatabase(databaseName))
    }, []);

    const databaseData = useSelector<StoreState, StoreState['dataModel']['currentDatabase']>(s => s.dataModel.currentDatabase);

    React.useEffect( () => {
        if (databaseData) setPanelContent(
            databaseData.pending ? <Spin />
            : <ul>
                <li>Document count: {databaseData.info?.doc_count}</li>
                <li>Update sequential: {databaseData.info?.update_seq}</li>
            </ul>
            
        )
    }, [databaseData]);

    return(
        <EntityAccordion getExtra={getExtra} onChange={(key) => onChange(key, classList)} injectedContent={panelContent} list={classList}/>
    )
}

export default ClassAccordion;