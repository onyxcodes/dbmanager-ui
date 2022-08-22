import React from 'react';

import { UserOutlined } from '@ant-design/icons';

import Header, { HeaderProps } from '../../commons/Header';
import MainMenu from '../../MainMenu';


interface MainHeaderProps extends HeaderProps {
}
const MainHeader = (props: MainHeaderProps) => {
    const mainItems = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: 'Info',
            key: 'info',
            icon: <UserOutlined />,
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <UserOutlined />,
        },
    ];
    
    const handleClick = (key: any) => {
        console.log("Clicked key", key)
    }
    return(
        <Header type='main' {...props}
            extra={<MainMenu items={mainItems} handleClick={handleClick}/>}
        />
    )
}

export default MainHeader;