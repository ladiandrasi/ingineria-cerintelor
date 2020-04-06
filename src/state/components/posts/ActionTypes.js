const prefix = 'POST';
export default class ActionTypes {
    static ACTIONS = {
        UPSERT: `${prefix}/UPSERT`,
        REMOVE: `${prefix}/REMOVE`,
        REFRESH: `${prefix}/REFRESH`,
    }
}
