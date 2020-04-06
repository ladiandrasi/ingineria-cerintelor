import React from "react";
import {connect} from "react-redux";
import './ViewProfileComponent.css';
import AvatarComponent from "../../../shared/avatar/AvatarComponent";
import {Card } from "antd";
const { Meta } = Card;

class ViewProfileComponent extends React.Component {
    render() {
        const { user } = this.props;
        const { bannerPictureUrl, profilePictureUrl, nickname, currentPosition, email } = user;
        return(
            <div className="profile-view-container" >
                <div className="title-container">View Profile</div>
                <div className='profile'>
                    <img alt="Profile Banner" src={bannerPictureUrl} />
                    <Meta
                        avatar={<AvatarComponent src={profilePictureUrl} size={150}/>}
                        title={nickname}
                        description={<span>{currentPosition}<br />{email}</span>}
                    />
                </div>
            </div>
        )
    }
}


export default ViewProfileComponent;
