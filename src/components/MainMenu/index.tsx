import DropdownMenu, { DropdownMenuProps }  from '../commons/DropdownMenu';
import React from 'react';


interface MainMenuProps extends DropdownMenuProps {
}
const MainMenu = (props: MainMenuProps) => {

    return(
        <DropdownMenu {...props} />
    )
}

export default MainMenu;