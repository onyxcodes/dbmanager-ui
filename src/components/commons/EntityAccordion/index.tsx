import React from 'react';

import { Collapse } from 'antd';

require('antd/lib/collapse/style');

interface EntityAccordionProps {
    extra?: JSX.Element; // will allow buttons at the right of the accordions header
}
const EntityAccordion = (props: EntityAccordionProps) => {
    const { extra } = props;
    const onChange = (key: string | string[], data: { name: string }[]) => {
        // TODO: load info data on request and dispatch action to add it to corresponding
        // obj in databaseList?
        if (key) {
            for ( const singleKey of [...key] ) {
                console.log("Got selected element(s):", data[Number(singleKey)]);
            }
        }
    };

    const testData = [
        { name: 'Title 1' },
        { name: 'Title 2' },
        { name: 'Title 3' },
        { name: 'Title 4' },
        { name: 'Title 5' },
    ]

    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
    `;

    return (
        <Collapse accordion={true}
            defaultActiveKey={['1']}
            onChange={(key: string | string[]) => onChange(key, testData)}>
            {testData.map((el, index) => {
                return (
                    <Collapse.Panel header={el.name} key={index} extra={extra}>
                        <p>{text}</p>
                    </Collapse.Panel>
                )
            })}
        </Collapse>
    )
}

export default EntityAccordion;