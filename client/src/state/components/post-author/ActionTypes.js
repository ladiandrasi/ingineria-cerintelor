
const prefix = 'POST_AUTHOR';
export default class ActionTypes {
    static ACTIONS = {
        UPSERT: `${prefix}/UPSERT`,
        REMOVE: `${prefix}/REMOVE`,
    }
}
