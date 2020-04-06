import React from 'react';
import {Button, Form, Input, message} from "antd";
import './ChangePasswordComponent.css';
import {omit} from "lodash";
import UserActions from "../../../state/components/users/UserActions";
import {connect} from "react-redux";

class ChangePasswordComponent extends React.Component {
    state = {
        confirmDirty: false,
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { updateUser, user: { _id: userId } } = this.props;
        const data = this.props.form.getFieldsValue();
        const { password } = data;
        await updateUser(userId, { password });
        message.success('Password updated successfully!');
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="general-information-container" >
                <div className="title-container">Change Password</div>
                <Form {...formItemLayout} className="change-password-form" labelAlign='left' onSubmit={this.handleSubmit}>
                    <Form.Item label="Old Password" hasFeedback>
                        {getFieldDecorator('oldPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your old password!',
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your new password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Change
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedChangePasswordComponent = Form.create({ name: 'change-password' })(ChangePasswordComponent);

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, data) => dispatch(UserActions.updateUser(userId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedChangePasswordComponent)
