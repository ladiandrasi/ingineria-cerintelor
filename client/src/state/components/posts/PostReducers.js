import ActionTypes from "./ActionTypes";
import { isArray } from 'lodash';
export default class PostReducers {
    static reduce(state = {}, action) {
        const { type } = action;
        const handlers = {
            [ActionTypes.ACTIONS.UPSERT]: PostReducers.upsert,
            [ActionTypes.ACTIONS.REMOVE]: PostReducers.remove,
            [ActionTypes.ACTIONS.REFRESH]: PostReducers.refresh,
        };

        const handler = handlers[type];
        return (handler) ? handler(state, action) : state;
    }

    static upsert(state, action) {
        const data = isArray(action.data) ? action.data : [action.data];
        const posts = data.reduce((accumulator, post) => {
            return {
                ...accumulator,
                [post._id]: post,
            }
        }, {});
        return {
            ...state,
            ...posts,
        }
    }

    static refresh(state, action) {
        const data = isArray(action.data) ? action.data : [action.data];
        const posts = data.reduce((accumulator, post) => {
            return {
                ...accumulator,
                [post._id]: post,
            }
        }, {});
        return {
            ...posts,
        }
    }

    static remove(state, action) {
        const newState = Object.assign({}, state);
        const { postId } = action;
        delete newState[postId];
        return newState;
    }
}
