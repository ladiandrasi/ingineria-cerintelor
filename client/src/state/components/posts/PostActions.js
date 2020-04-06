import ActionTypes from './ActionTypes';
import API from '../../../api/API';
import {DELETE, GET, POST, posts, PUT} from "../../../api/Endpoints";
import { isArray } from 'lodash';

export default class PostActions {
    static upsert(data) {
        return {
            type: ActionTypes.ACTIONS.UPSERT,
            data,
        };
    }

    static refresh(data) {
        return {
            type: ActionTypes.ACTIONS.REFRESH,
            data,
        };
    }

    static remove(postId) {
        return {
            type: ActionTypes.ACTIONS.REMOVE,
            postId,
        };
    }

    static fetchPosts() {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    GET,
                    posts.getAll(),
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(PostActions.refresh(isArray(data) ? data : [data]));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static fetchPostsFiltered(filter) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    GET,
                    posts.getFiltered(filter),
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(PostActions.refresh(isArray(data) ? data : [data]));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static insertPost(post) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    POST,
                    posts.insertOne(),
                    null,
                    post
                );
                const { status, data } = responseJSON;
                if(status === 200) {
                    dispatch(PostActions.upsert(isArray(data) ? data : [data]));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static removePost(postId) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    DELETE,
                    posts.deleteOne(postId),
                );
                const { status, data } = responseJSON;
                if(status === 200) {
                    dispatch(PostActions.remove(postId));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static updatePost(postId, newPost) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    PUT,
                    posts.updateOne(postId),
                    null,
                    newPost
                );
                const { status, data } = responseJSON;
                if(status === 200) {
                    dispatch(PostActions.upsert(data));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }
}
