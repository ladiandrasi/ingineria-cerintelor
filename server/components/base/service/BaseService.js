export default class BaseService {
    constructor(dao) {
        this._dao = dao;
    }

    get dao() {
        return this._dao;
    }

    async findOne(query) {
        return this.dao.findOne(query);
    }

    async findMany(query) {
        return this.dao.findMany(query);
    }

    async insertOne(entity) {
        return this.dao.insertOne(entity);
    }

    async updateOne(query, entity) {
        return this.dao.updateOne(query, entity);
    }

    async deleteOne(query) {
        return this.dao.deleteOne(query);
    }
}
