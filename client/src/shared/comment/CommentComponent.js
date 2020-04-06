import {Comment, Tooltip, Icon, message, Button, Popover} from 'antd';
import React, {Component} from "react";
import AvatarComponent from "../avatar/AvatarComponent";
import ModalActions from "../../state/components/modal/ModalActions";
import {connect} from "react-redux";
import ApplyJobComponent from "../../components/main/apply-job/ApplyJobComponent";
import './CommentComponent.css';
import { pull, isUndefined } from 'lodash';
import PostActions from "../../state/components/posts/PostActions";
import PopconfirmComponent from "../popconfirm/PopconfirmComponent";
import PostAuthorActions from "../../state/components/post-author/PostAuthorActions";
import ViewProfileComponent from "../../components/profile/view-profile/ViewProfileComponent";
import {postAuthor} from "../../api/Endpoints";
import UserSelectors from "../../state/components/users/UserSelectors";

class CommentComponent extends Component {
    async componentDidMount() {
        const { fetchPostAuthor, post: { postedBy } } = this.props;
        await fetchPostAuthor(postedBy);
    }
    _isPostLiked = () => {
        const { post, userId } = this.props;
        const { likedBy } = post;
        return likedBy.includes(userId);
    };

    _isPostDisliked = () => {
        const { post, userId } = this.props;
        const { dislikedBy } = post;
        return dislikedBy.includes(userId);
    };

    _getPopconfirmProps = () => {
        const onConfirm = async () => {
            const { removePost, post: { _id: postId } } = this.props;
            await removePost(postId);
            message.success('Post removed successfully!');
        };
        return {
            title: 'Are you sure you want to delete the post?',
            onConfirm,
            onCancel: () => {},
            okText: 'Yes',
            cancelText: 'No',
            buttonText: <Button><Icon type="delete" />Delete</Button>
        }
    }

    _getActions = () => {
        const { post, userId, applications, isFirmUser, isUserLoggedIn } = this.props;
        const { likedBy, dislikedBy } = post;
        const jobAlreadyAppliedTo = Object.values(applications)
            .find(application => application.postId === post._id);
        const content = !isUserLoggedIn || isUndefined(jobAlreadyAppliedTo)
            ? 'Click to apply to this job.'
            : 'You already applied to this job.';
        const applyAction = [
            <Popover key={1} content={content}>
                <Button disabled={isUserLoggedIn && !isUndefined(jobAlreadyAppliedTo)} onClick={this.applyToJob} key="comment-nested-reply-to"><Icon type="check" />Apply</Button>
            </Popover>,
        ];

        const deleteAction = [
            <PopconfirmComponent key={2} {...this._getPopconfirmProps()} />
        ];
        const extendedActions = [
            <span key="comment-basic-like" >
                <Tooltip title="Like">
                  <Icon id="like-button"
                      type="like"
                      theme={this._isPostLiked() ? 'filled' : 'outlined'}
                      onClick={this.likeHandler}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{likedBy.length}</span>
             </span>,
            <span key=' key="comment-basic-dislike"'>
                <Tooltip title="Dislike">
                  <Icon
                      type="dislike"
                      theme={this._isPostDisliked() ? 'filled' : 'outlined'}
                      onClick={this.dislikeHandler}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislikedBy.length}</span>
            </span>,
        ];

        if(!userId) {
            return applyAction;
        }
        if(this.getAuthor()._id === userId ) {
            return [
                ...extendedActions,
                ...deleteAction,
            ]
        } else {
            if(isFirmUser) {
                return extendedActions;
            }
            return [
                ...extendedActions,
                ...applyAction,
            ]
        }
    };

    likeHandler = async () => {
        const { post, userId, updatePost} = this.props;
        const { _id: postId  } = post;
        const { likedBy, dislikedBy } = post;
        const newPost = Object.assign({}, post);
        if(dislikedBy.includes(userId)) {
            pull(newPost.dislikedBy, userId);
            newPost.likedBy.push(userId);
            return await updatePost(postId, newPost);
        }

        if(likedBy.includes(userId)) {
            pull(newPost.likedBy, userId);
            return await updatePost(postId, newPost);
        }

        newPost.likedBy.push(userId);
        return await updatePost(postId, newPost);
    };
    dislikeHandler = async () => {
        const { post, userId, updatePost} = this.props;
        const { _id: postId  } = post;
        const { likedBy, dislikedBy } = post;
        const newPost = Object.assign({}, post);

        if(likedBy.includes(userId)) {
            pull(newPost.likedBy, userId);
            newPost.dislikedBy.push(userId);
            return await updatePost(postId, newPost);
        }

        if(dislikedBy.includes(userId)) {
            pull(newPost.dislikedBy, userId);
            return await updatePost(postId, newPost);
        }

        newPost.dislikedBy.push(userId);
        return await updatePost(postId, newPost);
    };

    applyToJob = () => {
        const { openModal, post } = this.props;
        openModal({ title: 'Apply to job',width: '35%', childrenComponent: <ApplyJobComponent post={post}/>});
    };

    _getContent = () => {
        const { post: { content } } = this.props;
        return  <div className="comment-content" dangerouslySetInnerHTML={{__html: content}} />;
    };

    getAuthor = () => {
        const { postAuthors, post: { postedBy } } = this.props;
        return postAuthors[postedBy] || {};
    };

    handleAvatarClick = () => {
        const { openModal } = this.props;
        openModal({width: '35%', childrenComponent: <ViewProfileComponent user={this.getAuthor()}/>});
    };

    render() {
        const { children, post: { jobTitle, jobPosition } } = this.props;
        const author = this.getAuthor();
        const { profilePictureUrl } = author;
        const actions = this._getActions();
        return (
            <Comment
                actions={actions}
                author={<span style={{fontWeight: '500'}}>{jobTitle}<br/><span style={{fontWeight: '400'}}>{jobPosition}</span></span>}
                avatar={<span onClick={this.handleAvatarClick}><AvatarComponent src={profilePictureUrl}/></span>}
                content={this._getContent()}
                className="comment-container"
            >
                {children}
            </Comment>
        );
    }
}

function mapStateToProps(state) {
    const { user: { _id }, applications, postAuthors } = state;
    return { userId: _id, applications, postAuthors, isUserLoggedIn: UserSelectors.isUserLoggedIn(state), isFirmUser: UserSelectors.isFirmUser(state) }
}

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(ModalActions.upsert(data)),
    updatePost: (postId, data) => dispatch(PostActions.updatePost(postId, data)),
    removePost: (postId) => dispatch(PostActions.removePost(postId)),
    fetchPostAuthor: (userId) => dispatch(PostAuthorActions.fetchPostAuthor(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent)
