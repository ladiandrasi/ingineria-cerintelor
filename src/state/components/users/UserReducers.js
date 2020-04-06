import ActionTypes from "./ActionTypes";

export default class UserReducers {
    static reduce(state = {}, action) {
        const { type } = action;
        const handlers = {
            [ActionTypes.ACTIONS.UPSERT]: UserReducers.upsert,
            [ActionTypes.ACTIONS.REMOVE]: UserReducers.remove,
        };

        const handler = handlers[type];
        return (handler) ? handler(state, action) : state;
    }

    static upsert(state, action) {
        return {
            ...state,
            ...action.data,
        };
    }

    static remove() {
        return {};
    }
}
