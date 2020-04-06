export default class BaseController {
    constructor(service) {
        this._service = service;
    }

    get service() {
        return this._service;
    }

    async findOne(query) {
        return this.service.findOne(query);
    }

    async findMany(query) {
        return this.service.findMany(query);
    }

    async insertOne(entitiy) {
        return this.service.insertOne(entitiy);
    }

    async updateOne(query, entity) {
        return this.service.updateOne(query, entity);
    }

    async deleteOne(query) {
        return this.service.deleteOne(query);
    }
}
