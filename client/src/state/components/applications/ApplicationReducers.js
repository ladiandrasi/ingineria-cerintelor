import ActionTypes from "./ActionTypes";
import { isArray } from 'lodash';

export default class ApplicationReducers {
    static reduce(state = {}, action) {
        const { type } = action;
        const handlers = {
            [ActionTypes.ACTIONS.UPSERT]: ApplicationReducers.upsert,
            [ActionTypes.ACTIONS.REMOVE]: ApplicationReducers.remove,
            [ActionTypes.ACTIONS.REFRESH]: ApplicationReducers.refresh,
        };

        const handler = handlers[type];
        return (handler) ? handler(state, action) : state;
    }

    static refresh(state, action) {
        const data = isArray(action.data) ? action.data : [action.data];
        const applications = data.reduce((accumulator, application) => {
            return {
                ...accumulator,
                [application._id]: application,
            }
        }, {});
        return {
            ...applications,
        }
    }

    static upsert(state, action) {
        const data = isArray(action.data) ? action.data : [action.data];
        const applications = data.reduce((accumulator, application) => {
            return {
                ...accumulator,
                [application._id]: application,
            }
        }, {});
        return {
            ...state,
            ...applications,
        }
    }

    static remove(state, action) {
        const newState = Object.assign({}, state);
        const { applicationId } = action;
        delete newState[applicationId];
        return newState;
    }
}
