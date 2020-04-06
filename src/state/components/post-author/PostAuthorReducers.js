import ActionTypes from "./ActionTypes";

export default class PostAuthorReducers {
    static reduce(state = {}, action) {
        const { type } = action;
        const handlers = {
            [ActionTypes.ACTIONS.UPSERT]: PostAuthorReducers.upsert,
            [ActionTypes.ACTIONS.REMOVE]: PostAuthorReducers.remove,
        };

        const handler = handlers[type];
        return (handler) ? handler(state, action) : state;
    }

    static upsert(state, action) {
        const { data: user } = action;
        return {
            ...state,
            [user._id]: user,
        };
    }

    static remove() {
        return {};
    }
}
