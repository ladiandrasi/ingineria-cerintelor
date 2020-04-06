import ActionTypes from "./ActionTypes";

export default class ModalReducers {
    static reduce(state = {}, action) {
        const { type } = action;
        const handlers = {
            [ActionTypes.ACTIONS.UPSERT]: ModalReducers.upsert,
            [ActionTypes.ACTIONS.REMOVE]: ModalReducers.remove,
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
