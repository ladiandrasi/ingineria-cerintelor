const prefix = 'APPLICATION';
export default class ActionTypes {
    static ACTIONS = {
        UPSERT: `${prefix}/UPSERT`,
        REMOVE: `${prefix}/REMOVE`,
        REFRESH: `${prefix}/REFRESH`,
    }
}
