import React from 'react';
require('antd/lib/page-header/style');
import { PageHeader } from 'antd';


export interface HeaderProps {
    type?: 'main' | 'view';
    title: string;
    extra?: JSX.Element | JSX.Element[];
}
const Header = ( props: HeaderProps ) => {
    const { type, title, extra } = props;

    return(
        <PageHeader
            className="site-page-header"
            // TODO: activate onBack and backIcon just for main with corresponding router link (for last history item)
            onBack={() => null} 
            backIcon={false}
            ghost={type === 'main' ? false : true}
            title={title}
            // subTitle="This is a subtitle"
            extra={extra}
        />
    )
}

export default Header;