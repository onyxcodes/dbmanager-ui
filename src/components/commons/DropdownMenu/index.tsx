import React from 'react';

import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

require('antd/lib/dropdown/style');
require('antd/lib/menu/style');

interface GlobalMenuProps {
	handleClick: (key: any) => void;
	items: {label: string; key: string; icon: JSX.Element;}[];
}
const GlobalMenu = (props: GlobalMenuProps) => {
	const { handleClick, items } = props;
	return (
		<Menu
			onClick={({ key }) => handleClick(key)}
			items={items}
		/>
	)
}

export interface DropdownMenuProps {
	handleClick: (key: any) => void;
	items: {label: string; key: string; icon: JSX.Element;}[];
}
const DropdownMenu = (props: DropdownMenuProps) => {
	const { items, handleClick } = props;
	return (
		<Dropdown
			overlay={<GlobalMenu 
				handleClick={handleClick}
				items={items}
			/>}>
			<Button>
				<Space>
					Menu
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	)
}

export default DropdownMenu;