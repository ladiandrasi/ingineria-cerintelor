import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Button, message,
} from 'antd';
import React from "react";
import {connect} from "react-redux";
import UserActions from "../../../state/components/users/UserActions";
import { omit } from 'lodash';
import StudiesHelper from "../../../helpers/StudiesHelper";
import CitiesHelper from "../../../helpers/CitiesHelper";
import './RegisterComponenet.css';
import ModalActions from "../../../state/components/modal/ModalActions";

const { Option } = Select;

const residences = Object.entries(CitiesHelper.getCountiesWithCities()).map(([county, cities]) => {
    return {
        children: cities,
        value: county,
        label: county,
    }
});

class RegisterComponent extends React.Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const { insertOne, closeModal } = this.props;
        const data = this.props.form.getFieldsValue();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        await insertOne(data);
        message.success('You registered successfully!');
        closeModal();
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

        const {
            user: {
                email,
                nickname,
                residence,
                phone,
                prefix,
                currentPosition,
                lastName,
                firstName,
                profilePictureUrl,
                bannerPictureUrl,
                userType,
                studies
            } } = this.props;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: prefix,
        })(
            <Select style={{ width: 70 }}>
                <Option value="07">07</Option>
                <Option value="02">02</Option>
            </Select>,
        );

        return (
            <Form labelAlign='left' {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="E-mail" hasFeedback>
                    {getFieldDecorator('email', {
                        initialValue: email,
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    hasFeedback
                    label={
                        <span>
              Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('nickname', {
                        initialValue: nickname,
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="First Name" hasFeedback>
                    {getFieldDecorator('firstName', {
                        initialValue: firstName,
                        rules: [
                            {
                                required: true,
                                message: 'Please input your first name!',
                            }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Last Name" hasFeedback>
                    {getFieldDecorator('lastName', {
                        initialValue: lastName,
                        rules: [
                            {
                                required: true,
                                message: 'Please input your last name!',
                            }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="Residence" hasFeedback>
                    {getFieldDecorator('residence', {
                        initialValue: residence,
                        rules: [
                            { type: 'array', required: true, message: 'Please select your habitual residence!' },
                        ],
                    })(<Cascader options={residences} />)}
                </Form.Item>
                <Form.Item label="Phone Number" hasFeedback>
                    {getFieldDecorator('phone', {
                        initialValue: phone,
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Studies" hasFeedback>
                    {getFieldDecorator('studies', {
                        initialValue: studies,
                        rules: [
                            { required: true, message: 'Please select your studies!' },
                        ],
                    })(
                        <Select mode="single" placeholder="Please select studies">
                            {Object.entries(StudiesHelper.STUDY_LEVELS).map(([type, name], index) => {
                                return (
                                    <Option key={index} value={type}>{name}</Option>
                                )
                            })}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="Current Position" hasFeedback>
                    {getFieldDecorator('currentPosition', {
                        initialValue: currentPosition,
                        rules: [{ required: true, message: 'Please input current position!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Profile Picture URL">
                    {getFieldDecorator('profilePictureUrl', {
                        initialValue: profilePictureUrl,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Banner Picture URL">
                    {getFieldDecorator('bannerPictureUrl', {
                        initialValue: bannerPictureUrl,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="User type">
                    {getFieldDecorator('userType', {
                        initialValue: userType,
                        rules: [{ required: true, message: 'Please select user type!' }],
                    })(
                        <Select>
                            <Option value="student">Student</Option>
                            <Option value="firm">Firm</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item className='register-confirm-button'>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegisterComponent = Form.create({ name: 'register' })(RegisterComponent);

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

const mapDispatchToProps = dispatch => ({
    insertOne: (data) => dispatch(UserActions.insertUser(data)),
    closeModal: () => dispatch(ModalActions.remove()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterComponent)
