import ActionTypes from './ActionTypes';

export default class ModalActions {
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
}
