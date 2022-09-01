import React from 'react';

import { Collapse } from 'antd';


require('antd/lib/collapse/style');

interface EntityAccordionProps {
    list: { name: String; content?: any }[];
    injectedContent?: JSX.Element;
    onChange?: (...arg: any) => void;
    extra?: JSX.Element; // will allow buttons at the right of the accordions header
    getExtra?: ( ...arg: any) => JSX.Element;
}
const EntityAccordion = (props: EntityAccordionProps) => {
    const { extra, list, injectedContent, onChange, getExtra } = props;

    return (
        <Collapse accordion={true}
            defaultActiveKey={['1']}
            onChange={(key: string | string[]) => onChange && onChange(key)}>
            {list?.map((el, index) => {
                return (
                    <Collapse.Panel 
                        header={el.name} key={index}
                        extra={extra || (getExtra && getExtra(el.name))}
                    >
                        <p>{el?.content || injectedContent}</p>
                    </Collapse.Panel>
                )
            })}
        </Collapse>
    )
}

export default EntityAccordion;