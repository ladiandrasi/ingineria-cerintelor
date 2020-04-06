import DB from '../../../db/DB';
import { ObjectID } from 'mongodb';

const ENTITY_TYPES = Object.freeze({
    USERS: 'users',
    POSTS: 'posts',
    APPLICATIONS: 'applications',
});

export default class BaseDao {
    constructor(collectionName) {
        this._db = DB.dbInstance;
        this._collectionName = collectionName;
    }

    get db() {
        return this._db;
    }

    get collectionName() {
        return this._collectionName;
    }

    collection() {
        return this.db.collection(this.collectionName);
    }

    async findOne(query) {
        return this.collection().findOne(query);
    }

    async findMany(query) {
        return this.collection().find(query).sort( {_id: -1 }).toArray();
    }

    async insertOne(entity) {
        const entityWithId = this._assignId(entity);
        const result = await this.collection().insertOne(entityWithId);
        return result.ops[0];
    }

    async updateOne(query, entity) {
        const dbEntity = await this.findOne(query);
        const updateEntity = Object.assign({}, dbEntity, entity);
        const result = await this.collection().findOneAndUpdate(query, { $set: updateEntity }, { returnOriginal: false });
        return result.value;
    }

    async deleteOne(query) {
        return this.collection().deleteOne(query);
    }

    _assignId(entity) {
        return {
            ...entity,
            _id: new ObjectID().toString(),
        }
    }
}

export {
    ENTITY_TYPES,
}
