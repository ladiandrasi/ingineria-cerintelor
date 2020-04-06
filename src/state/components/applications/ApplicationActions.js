import ActionTypes from './ActionTypes';
import API from '../../../api/API';
import {applications, DELETE, GET, POST, PUT, users} from "../../../api/Endpoints";
import { isArray } from 'lodash';

export default class ApplicationActions {
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

    static remove(applicationId) {
        return {
            type: ActionTypes.ACTIONS.REMOVE,
            applicationId,
        };
    }

    static fetchApplications() {
        return async (dispatch, getState) => {
            try {
                const { user: { _id: userId, userType }} = getState();
                const endpoint = userType === 'student'
                    ? applications.getAllStudentApplications(userId)
                    : applications.getAllFirmApplications(userId);
                const responseJSON = await API.request(
                    GET,
                    endpoint,
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(ApplicationActions.refresh(isArray(data) ? data : [data]));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static insertApplication(application) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    POST,
                    applications.insertOne(),
                    null,
                    application
                );
                const { status, data } = responseJSON;
                if(status === 200) {
                    dispatch(ApplicationActions.upsert(isArray(data) ? data : [data]));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    static updateApplication(applicationId, applicationData) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    PUT,
                    applications.updateOne(applicationId),
                    null,
                    applicationData
                );
                const { data } = responseJSON;
                if (data) {
                    dispatch(ApplicationActions.upsert(data));
                }
            } catch (error) {
                console.error(error);
            }
        };
    }
}
