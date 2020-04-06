import {Button, Card, Collapse, Descriptions, Empty, Form, Icon, message, Popover} from 'antd';
import React from 'react';
import './FirmApplications.css';
import {connect} from "react-redux";
import ApplicationActions from "../../../state/components/applications/ApplicationActions";
import ApplicationHelper from "../../../state/components/applications/ApplicationHelper";
import AvatarComponent from "../../../shared/avatar/AvatarComponent";

const { Panel } = Collapse;
const { Meta } = Card;

class FirmApplications extends React.Component {
    genExtra = (application) => {
        const { applicationStatus } = application;
        if (applicationStatus === ApplicationHelper.STATUSES.APPROVED) {
            return (
                <Popover content={'Application is approved.'}>
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                </Popover>
            )
        }
        if (applicationStatus === ApplicationHelper.STATUSES.DENIED) {
            return (
                <Popover content={'Application is denied.'}>
                    <Icon type="close-circle" theme="twoTone" twoToneColor="red"/>
                </Popover>
            )
        }
        return (
            <Popover content={'Application is pending.'}>
                <Icon type="sync" spin twoToneColor="#eb2f96"/>
            </Popover>
        )

    };

    handleApplicationButtonClick = async (applicationId, applicationStatus) => {
        console.log(applicationId);
        const { updateApplication } = this.props;
        await updateApplication(applicationId, { applicationStatus });
        message.info(`Application has been ${applicationStatus}`);
    };

    getJobPostContent = ([applicationKey, application], index) => {
        const { postId, firstName, lastName, yearsWorked, email, studies, phone, profilePictureUrl = undefined } = application;
        const { posts } = this.props;
        const { applicationStatus } = application;
        const applicationPending = applicationStatus === 'pending';
        const header =
            <Meta
                avatar={<AvatarComponent src={profilePictureUrl} size='large'/>}
                title={<div>{firstName} {lastName}<span style={{float: "right"}}>{this.genExtra(application)}</span></div>}
                description={email}
            />;

        if(!posts[postId]) {
            return null;
        }
        return (
            <Panel header={header} key={index}>
                <Descriptions title="User Info">
                    <Descriptions.Item label="First Name">{firstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{lastName}</Descriptions.Item>
                    <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
                    <Descriptions.Item label="Phone number">{phone}</Descriptions.Item>
                    <Descriptions.Item label="Studies">{studies}</Descriptions.Item>
                    <Descriptions.Item label="Years worked">{yearsWorked}</Descriptions.Item>
                </Descriptions>
                {applicationPending && <Button onClick={() => this.handleApplicationButtonClick(applicationKey, 'approved')} nc className='job-application-button' type="primary">Approve</Button>}
                {applicationPending && <Button onClick={() => this.handleApplicationButtonClick(applicationKey, 'denied')} className='job-application-button' type="danger">Decline</Button>}
            </Panel>
        )
    };
    async componentDidMount() {
        const { fetchApplications } = this.props;
        await fetchApplications();
    }

    render() {
        const { applications } = this.props;
        return (
            <div className="general-information-container" >
                <div className="title-container">Job Applications</div>
                {Object.entries(applications).length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                <Collapse className="jobs-applied-content" bordered={false}>
                    {Object.entries(applications).map(this.getJobPostContent.bind(this))}
                </Collapse>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { applications, posts } = state;
    return { applications, posts }
}

const mapDispatchToProps = dispatch => ({
    fetchApplications: () => dispatch(ApplicationActions.fetchApplications()),
    updateApplication: (applicationId, applicationData) => dispatch(ApplicationActions.updateApplication(applicationId, applicationData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirmApplications);
