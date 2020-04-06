import {
    Form,
    Select,
    InputNumber,
    Input,
    Switch,
    Button,
    Upload,
    Icon,
    message,
} from 'antd';
import React from "react";
import ApplicationActions from "../../../state/components/applications/ApplicationActions";
import {connect} from "react-redux";
import ModalActions from "../../../state/components/modal/ModalActions";
import ApplicationHelper from "../../../state/components/applications/ApplicationHelper";
import StudiesHelper from "../../../helpers/StudiesHelper";

const { Option } = Select;

class ApplyJobComponent extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault();
        const { insertApplication, closeModal } = this.props;
        const data = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        await insertApplication({ ...data, applicationStatus: ApplicationHelper.STATUSES.PENDING });
        closeModal();
        message.success('Successfully applied to job!');
    };

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { post, user } = this.props;
        const { firstName, lastName, email, phone, prefix, studies, profilePictureUrl } = user;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item key='job_id' style={{display: "none"}} label="Job Id" >
                    {getFieldDecorator('postId', { initialValue: post._id })(
                        <span className="ant-form-text">{post._id}</span>
                    )}
                </Form.Item>
                <Form.Item key='user_id' style={{display: "none"}} label="User Id">
                    {getFieldDecorator('userId', { initialValue: user._id })(
                        <span className="ant-form-text">{user._id}</span>
                    )}
                </Form.Item>
                <Form.Item key='profile_picture_url' style={{display: "none"}} label="Profile Picture Url">
                    {getFieldDecorator('profilePictureUrl', { initialValue: profilePictureUrl  })(
                        <span className="ant-form-text">{profilePictureUrl}</span>
                    )}
                </Form.Item>
                <Form.Item key='last_name' label="Last Name" className="last_name_apply_job" hasFeedback>
                    {getFieldDecorator('lastName', {
                        initialValue: lastName,
                        rules: [{ required: true, message: 'Please input your family name!' }],
                    })(
                        <Input placeholder='Last Name'/>
                    )}
                </Form.Item>
                <Form.Item key='first_name' label="First Name"  className="first_name_apply_job" hasFeedback>
                    {getFieldDecorator('firstName', {
                        initialValue: firstName,
                        rules: [{ required: true, message: 'Please input your first name!' }],
                    })(
                        <Input placeholder='First Name' />
                    )}
                </Form.Item>
                <Form.Item key='email' label="E-mail" className="email_apply_job" hasFeedback>
                    {getFieldDecorator('email', {
                        initialValue: email,
                        rules: [{ required: true, message: 'Please input your e-mail!' }],
                    })(
                        <Input placeholder='E-mail' />
                    )}
                </Form.Item>
                <Form.Item key='phone_number' label="Phone Number" className="phone_apply_job" hasFeedback>
                    {getFieldDecorator('phone', {
                        initialValue: `${prefix || ''}${phone || ''}`,
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input placeholder='Phone Number'/>
                    )}
                </Form.Item>
                <Form.Item key='studies' label="Studies" className="studies_apply_job" hasFeedback>
                    {getFieldDecorator('studies', {
                        initialValue: studies,
                        rules: [
                            { required: true, message: 'Please select your studies!' },
                        ],
                    })(
                        <Select mode="single" placeholder="Please select studies">
                            {Object.entries(StudiesHelper.STUDY_LEVELS).map(([type, name]) => {
                                return (
                                    <Option key={name} value={type}>{name}</Option>
                                )
                            })}
                        </Select>,
                    )}
                </Form.Item>

                <Form.Item key='years_worked' label="Years Worked" className="years-worked-apply-job">
                    {getFieldDecorator('yearsWorked', { initialValue: 0 })(<InputNumber min={1} max={100} />)}
                    <span className="ant-form-text"> years</span>
                </Form.Item>

                <Form.Item key='applied_before' label="Applied before">
                    {getFieldDecorator('appliedBefore', { valuePropName: 'checked' })(<Switch />)}
                </Form.Item>

                <Form.Item key='curriculum_vitae' label="Curriculum Vitae">
                    {getFieldDecorator('curriculumVitae', {
                        valuePropName: 'fileList',
                        rules: [
                            { required: true, message: 'Please upload a CV!' },
                        ],
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload.Dragger beforeUpload={file => {
                            const reader = new FileReader();

                            reader.onload = e => {
                                // console.log(e.target.result);
                            };
                            reader.readAsText(file);

                            // Prevent upload
                            return false;
                        }} name="files">
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>,
                    )}
                </Form.Item>

                <Form.Item key='submit_button' className="submit-apply-job" wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedApplyJobComponent = Form.create({ name: 'validate_other' })(ApplyJobComponent);

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}


const mapDispatchToProps = dispatch => ({
    insertApplication: (application) => dispatch(ApplicationActions.insertApplication(application)),
    closeModal: () => dispatch(ModalActions.remove()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedApplyJobComponent)
