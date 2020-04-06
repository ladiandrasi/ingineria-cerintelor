import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import './ProfileInformationComponent.css';
import AvatarComponent from "../../../shared/avatar/AvatarComponent";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import UserSelectors from "../../../state/components/users/UserSelectors";

const { Meta } = Card;
class ProfileInformationComponent extends Component {
    render() {
        const {
            user: {
                nickname = 'Anonymous',
                currentPosition = 'Anonymous Position',
                profilePictureUrl,
                bannerPictureUrl = "http://fair-travel.se/wp-content/uploads/2012/05/Cotopaxi-2-1000x400.jpg",
            },
            isUserLoggedIn
        } = this.props;

        const actions = [
            <span onClick={() => this.props.history.push({ pathname: '/profile', state: { childComponent: 'generalInformation'}})}><Icon type="setting" key="setting" /> Settings</span>,
            <span onClick={() => this.props.history.push({ pathname: '/profile', state: { childComponent: 'jobsApplied'}})}><Icon type="edit" key="edit" /> Applications</span>,
        ];
        return (
            <Card
                className="profile-information-card"
                cover={
                    <img
                        alt="Banner Photo"
                        src={bannerPictureUrl}
                    />
                }
                actions={isUserLoggedIn ? actions : []}
            >
                <Meta
                    avatar={<AvatarComponent src={profilePictureUrl} size='large'/>}
                    title={nickname}
                    description={currentPosition}
                />
            </Card>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user, isUserLoggedIn: UserSelectors.isUserLoggedIn(state) }
}

const mapDispatchToProps = dispatch => ({
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileInformationComponent));
