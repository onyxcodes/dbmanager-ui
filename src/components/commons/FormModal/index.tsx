import React from 'react';
import { Modal, Button } from 'antd';

require('antd/lib/modal/style');

interface FormModalProps {
    title: string;
    visible: boolean;
    onCancel: (...arg: any) => void;
    onConfirm: (...arg: any) => void;
    confirmLabel?: string;
    form: JSX.Element
}
const FormModal = ( props:FormModalProps ) => {
    const { title, visible, onCancel, onConfirm, form, confirmLabel = 'Confirm' } = props; 

    return (
        <Modal 
            title={title}
            visible={visible}
            onCancel={onCancel}
            footer={
            <>
                <Button 
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onConfirm}
                    type="primary" 
                    htmlType="submit"
                >
                    {confirmLabel}
                </Button>
            </>
            }
        >
            {form}
        </Modal>
    )
}

export default FormModal;