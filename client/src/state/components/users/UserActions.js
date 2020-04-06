import ActionTypes from './ActionTypes';
import API from '../../../api/API';
import {GET, POST, PUT, users} from "../../../api/Endpoints";

export default class CurrentUserActions {
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

    static fetchUser(userId) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    GET,
                    users.getOne(userId),
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(CurrentUserActions.upsert(data));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static updateUser(userId, userData) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    PUT,
                    users.updateOne(userId),
                    null,
                    userData
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(CurrentUserActions.upsert(data));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static insertUser(userData) {
        return async (dispatch, getState) => {
            try {
                await API.request(
                    POST,
                    users.insertOne(),
                    null,
                    userData
                );

            } catch (error) {
                console.error(error);
            }
        };
    }
}
