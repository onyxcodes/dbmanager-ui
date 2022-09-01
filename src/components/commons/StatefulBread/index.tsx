import React from 'react';
import { Breadcrumb } from 'antd';
import StatefulLink from '../StatefulLink';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../store';
import { HomeOutlined } from '@ant-design/icons';
require('antd/lib/breadcrumb/style');

interface StatefulBreadProps {
    showHome?: boolean
}

// const keywords = [
//     'db', 'class'
// ]

const keywords: {
    [key: string]: string | JSX.Element;
} = {
    'home': <HomeOutlined />,
    'db': 'Database',
    'class': 'Class'
}
const pathToBreadcrumbs = ( path: string ) => {
    // split into string the path, skip empty
    const pathParts = path.split('/').filter( i => i);
    let links: string[] = [];
    let elements: JSX.Element[] = [];
    for ( var i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];
        if ( !keywords.hasOwnProperty(pathPart) ) {
            const prevPart = pathParts[i-1];
            let link: string = prevPart && keywords.hasOwnProperty(prevPart) ? prevPart.concat(`/${pathPart}`) : pathPart;
            // prepend the previous part of the path
            link = links[links.length-1] ? `${links[links.length-1]}/`.concat(link) : `/${link}`;
            links.push(link);
            // TODO: consider hilighting keyword part
            let elementKey = links[links.length-1],
                elementText = prevPart && keywords.hasOwnProperty(prevPart) ? `${keywords[prevPart]}: ${pathPart}` : pathPart, 
                element = <Breadcrumb.Item key={elementKey}>
                    <StatefulLink to={link}>{elementText}</StatefulLink>
                </Breadcrumb.Item>
            elements.push(element);
        }
    }
    return elements;
}

const StatefulBread = (props: StatefulBreadProps) => {
    const { showHome = false } = props;
    const path = useSelector<StoreState, StoreState['ui']['path']>(s => s.ui.path);
    const homeBreadcrumb = <Breadcrumb.Item key='home'>
        <StatefulLink to='/'>{keywords['home']}</StatefulLink>
    </Breadcrumb.Item>
    const breadcrumbs = React.useMemo( () => pathToBreadcrumbs(path), [path]);
    return (
        <Breadcrumb>
            {showHome ? [ homeBreadcrumb, ...breadcrumbs] : breadcrumbs}
        </Breadcrumb>
    )
};

export default StatefulBread;