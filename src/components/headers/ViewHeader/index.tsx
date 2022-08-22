import React from 'react';
import Header, { HeaderProps } from '../../commons/Header';

interface ViewHeaderProps extends HeaderProps {
    actions?: JSX.Element | JSX.Element[];
}
const ViewHeader = (props: ViewHeaderProps) => {
    const { actions } = props;
    return(
        <Header type='view' {...props}
            extra={actions} />
    )
}

export default ViewHeader;