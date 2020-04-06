const prefix = 'USER';
export default class ActionTypes {
    static ACTIONS = {
        UPSERT: `${prefix}/UPSERT`,
        REMOVE: `${prefix}/REMOVE`,
    }
}
