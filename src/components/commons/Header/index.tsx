import React from 'react';
require('antd/lib/page-header/style');
import { PageHeader, PageHeaderProps } from 'antd';
import { Link } from 'react-router-dom';
import StatefulLink from '../StatefulLink';


export interface HeaderProps {
    type?: 'main' | 'view';
    title: string | JSX.Element;
    extra?: JSX.Element | JSX.Element[];
    breadcrumb?: PageHeaderProps['breadcrumb']
}
const Header = ( props: HeaderProps ) => {
    const { type, title, extra, breadcrumb } = props;

    return(
        <PageHeader
            className="site-page-header"
            // TODO: activate onBack and backIcon just for main with corresponding router link (for last history item)
            onBack={() => null}
            breadcrumb={breadcrumb}
            backIcon={false}
            ghost={type === 'main' ? false : true}
            title={type === 'main' ? <StatefulLink to='/'>{title}</StatefulLink> : title}
            // subTitle="This is a subtitle"
            extra={extra}
        />
    )
}

export default Header;