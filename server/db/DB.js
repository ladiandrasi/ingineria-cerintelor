import DBConfig from '../config'
import { MongoClient } from 'mongodb';

class DB {
    constructor() {
        this.url = DBConfig.url;
        this.dbName = DBConfig.db;
        this.db = null;
    }

    get dbInstance() {
        return this.db;
    }

    async connect() {
        const client = await MongoClient.connect(this.url);
        this.db = client.db(this.dbName);
        console.log(`Database url: ${this.url}, database name: ${this.dbName}`);
    }
}

export default new DB();
