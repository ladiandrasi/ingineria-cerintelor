import React from 'react';
import {Button, Card, Carousel, Icon, Popover} from "antd";
import './LatestJobsComponent.css';
import { connect } from "react-redux";
import AvatarComponent from "../../../shared/avatar/AvatarComponent";
import {isUndefined} from "lodash";
import ApplyJobComponent from "../apply-job/ApplyJobComponent";
import ModalActions from "../../../state/components/modal/ModalActions";
import UserSelectors from "../../../state/components/users/UserSelectors";

const { Meta } = Card;
var i = 0;

class LatestJobsComponent extends React.Component {
    applyToJob = (post, jobAlreadyAppliedTo) => {
        const { isUserLoggedIn, user } = this.props;
        if(user.userType === 'firm') {
            return null;
        }
        if(isUserLoggedIn && user.userType === 'student' && !isUndefined(jobAlreadyAppliedTo)) {
            return null;
        }
        const { openModal } = this.props;
        openModal({ title: 'Apply to job',width: '35%', childrenComponent: <ApplyJobComponent post={post}/>});
    };

    getActions = (post) => {
        const { applications, user, isUserLoggedIn } = this.props;
        const button_id = i++;
        const jobAlreadyAppliedTo = Object.values(applications)
            .find(application => application.postId === post._id);
        const isStudent = user.userType === 'student';
        const content = !isUserLoggedIn || isUndefined(jobAlreadyAppliedTo)
            ? 'Click to apply to this job.'
            : 'You already applied to this job.';
        const css = {
            cursor: !isUserLoggedIn || isUndefined(jobAlreadyAppliedTo) ? 'pointer': 'no-drop',
        };
        return [
            <Popover content={content}>
                <span style={css} id={button_id} onClick={() => this.applyToJob(post, jobAlreadyAppliedTo)} key="apply"><Icon type="check" /> Apply</span>
            </Popover>
        ];
    };

    getContent = () => {
        const { posts, postAuthors } = this.props;

        return Object.values(posts).map((post, index) => {
            const { jobTitle, jobPosition, shortDescription, postedBy } = post;
            const author = postAuthors[postedBy] || {};
            const { profilePictureUrl } = author;
            const actions = this.getActions(post);
            return (
                <Card
                    className="latest-jobs-card"
                    actions={actions}
                    key={index}
                >
                    <Meta
                        avatar={<AvatarComponent src={profilePictureUrl} size='large'/>}
                        title={jobTitle}
                        description={jobPosition}
                    />
                    <div className='short-description-container'>
                        <span>{shortDescription}</span>
                    </div>
                </Card>
            );
        })
    };

    render() {
        return(
            <div className="latest-jobs-container" >
                <Carousel dots={false} autoplay>
                    {this.getContent()}
                </Carousel>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { posts, applications, postAuthors, user } = state;
    return { posts, applications, postAuthors, isUserLoggedIn: UserSelectors.isUserLoggedIn(state), user }
}

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(ModalActions.upsert(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestJobsComponent);
