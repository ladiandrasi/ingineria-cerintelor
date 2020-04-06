import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './LoginComponent.css';
import {connect} from "react-redux";
import ModalActions from "../../../state/components/modal/ModalActions";
import ApplicationActions from "../../../state/components/applications/ApplicationActions";
import AuthActions from "../../../state/components/auth/AuthActions";


class LoginComponent extends React.Component {
    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        await this.handleLogin(email, password);
    };

    handleLogin = async (email, password) => {
        const { login, closeModal, fetchApplications } = this.props;
        try {
            await login({email, password});
            await fetchApplications();
            closeModal();
            message.success('Logged in successfully!');
        } catch (e) {
            message.error('Login failed. Wrong credentials!');
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="E-Mail"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(LoginComponent);

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(AuthActions.login(data)),
    fetchApplications: () => dispatch(ApplicationActions.fetchApplications()),
    closeModal: () => dispatch(ModalActions.remove()),
});

export default connect(null, mapDispatchToProps)(LoginForm)
