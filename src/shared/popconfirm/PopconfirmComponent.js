import { Popconfirm, message } from 'antd';
import React, { Component } from 'react';

export default class PopconfirmComponent extends Component {
    render() {
        const { title, onConfirm, onCancel, okText, cancelText, buttonText } = this.props;
        return(
            <Popconfirm
                title={title}
                onConfirm={onConfirm}
                onCancel={onCancel}
                okText={okText}
                cancelText={cancelText}
            >
                {buttonText}
            </Popconfirm>
        );
    }
}
