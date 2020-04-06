import React from 'react';
import { Modal } from 'antd';
import {connect} from "react-redux";
import UserActions from "../../state/components/users/UserActions";
import ModalActions from "../../state/components/modal/ModalActions";

class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        const { closeModal } = this.props;
        closeModal();
    };

    render() {
        const { modal: { childrenComponent, width, title, footer = null } } = this.props;
        if(!childrenComponent) {
            return null;
        }
        return (
            <Modal
                title={title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={width}
                footer={footer}
            >
                {childrenComponent}
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    const { modal } = state;
    return { modal }
}

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(ModalActions.remove()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)
