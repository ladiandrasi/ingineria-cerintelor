import ActionTypes from './ActionTypes';
import API from '../../../api/API';
import {GET, postAuthor} from "../../../api/Endpoints";

export default class PostAuthorActions {
    static upsert(data) {
        return {
            type: ActionTypes.ACTIONS.UPSERT,
            data,
        };
    }

    static remove() {
        return {
            type: ActionTypes.ACTIONS.REMOVE,
        };
    }

    static fetchPostAuthor(userId) {
        return async (dispatch, getState) => {
            try {
                const { postAuthors } = getState();
                if(postAuthors[userId]) {
                    return null;
                }
                const responseJSON = await API.request(
                    GET,
                    postAuthor.getOne(userId),
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(PostAuthorActions.upsert(data));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }
}
