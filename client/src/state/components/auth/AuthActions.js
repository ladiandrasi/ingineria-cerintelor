import API from '../../../api/API';
import {auth, POST} from "../../../api/Endpoints";
import UserActions from "../users/UserActions";
import PostAuthorActions from "../post-author/PostAuthorActions";

export default class AuthActions {
    static login(userCredentials) {
        return async (dispatch, getState) => {
            try {
                const responseJSON = await API.request(
                    POST,
                    auth.login(),
                    null,
                    userCredentials
                );
                const { status, data } = responseJSON;
                if(status === 200) {
                    dispatch(UserActions.upsert(data.user));
                    dispatch(PostAuthorActions.upsert(data.user));
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        };
    }
}
