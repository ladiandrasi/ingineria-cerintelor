import { Collapse, Empty, Icon, Popover } from 'antd';
import React from 'react';
import './JobsAppliedComponent.css';
import {connect} from "react-redux";
import ApplicationActions from "../../../state/components/applications/ApplicationActions";
import ApplicationHelper from "../../../state/components/applications/ApplicationHelper";

const { Panel } = Collapse;

class JobsAppliedComponent extends React.Component {
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
    getJobPostContent = ([applicationKey, application], index) => {
        const { postId } = application;
        const { posts } = this.props;
        if(!posts[postId]) {
            return null;
        }
        const { content, jobTitle } = posts[postId];

        return (
            <Panel header={jobTitle} key={index} extra={this.genExtra(application)}>
                <div className="comment-content" dangerouslySetInnerHTML={{__html: content}} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsAppliedComponent);
