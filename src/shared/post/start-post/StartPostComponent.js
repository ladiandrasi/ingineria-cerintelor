import React from 'react';
import './StartPostComponent.css';
import {Card, Icon} from "antd";
import AvatarComponent from "../../avatar/AvatarComponent";
import ModalActions from "../../../state/components/modal/ModalActions";
import {connect} from "react-redux";
// {/*<div onClick={startPost} className='start-post-container'>Start post</div>*/}

class StartPostComponent extends React.Component {
    render() {
        const { startPost, user: { nickname, profilePictureUrl } } = this.props;
        return(
            <Card className='start-post-card' title={<span><Icon type="edit" /> Post an offer</span>}>
                <div className='start-post-container'>
                    <AvatarComponent src={profilePictureUrl} size='large'/>
                    <div className='.start-post' onClick={startPost}>
                        <span>Maybe post a job offer, {nickname}?</span>
                    </div>
                </div>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

export default connect(mapStateToProps)(StartPostComponent)
