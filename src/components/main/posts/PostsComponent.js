import React, { Component } from "react";
import CommentComponent from "../../../shared/comment/CommentComponent";
import { connect } from "react-redux";
import PostActions from "../../../state/components/posts/PostActions";
import './PostsComponent.css';
import PostComponent from "../../../shared/post/PostComponent";
import { isEmpty } from 'lodash';
import UserSelectors from "../../../state/components/users/UserSelectors";

class PostsComponent extends Component {
    async componentDidMount() {
        const { fetchPosts } = this.props;
        await fetchPosts();
    }

    _renderPosts = () => {
        const { posts } = this.props;
        return Object.entries(posts).map(([key, post]) =>
            <CommentComponent
                className="comment-component"
                key={key}
                post={post}
            />
        )
    };

    render() {
        const { posts, isFirmUser } = this.props;
        return (
            <div>
                {isFirmUser && <PostComponent />}
                {isFirmUser && !isEmpty(posts) && <div style={{ marginTop: '12px', height: '1px', backgroundColor:'#aaa'}}/>}
                {this._renderPosts()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { posts, user } = state;
    return {
        posts,
        user,
        isFirmUser: UserSelectors.isFirmUser(state)
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(PostActions.fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent)

