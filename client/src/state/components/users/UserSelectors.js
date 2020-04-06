import { isEmpty } from 'lodash';

export default class UserSelectors {
    static isUserLoggedIn(state) {
        return !isEmpty(state.user)
    }

    static isFirmUser(state) {
        const { user: { userType } = {} } = state;
        return userType === 'firm';
    }
}
