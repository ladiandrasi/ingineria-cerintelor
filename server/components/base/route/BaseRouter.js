import { Router } from 'express';
import BaseController from "../controller/BaseController";
import BaseService from "../service/BaseService";
import BaseDao from "../dao/BaseDao";

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export default class BaseRouter {
    constructor(app, basePath) {
        this._router = new Router();
        this._path = basePath;
        this._app = app;
        const routes = this.getRoutes();

        routes.forEach((route) => {
            const { path, middlewares = [], function: handler } = route;

            switch (route.method) {
                case GET:
                    this._router.get(path, ...middlewares, handler);
                    break;
                case POST:
                    this._router.post(path, ...middlewares, handler);
                    break;
                case PUT:
                    this._router.put(path, ...middlewares, handler);
                    break;
                case DELETE:
                    this._router.delete(path, ...middlewares, handler);
                    break;
                default:
                    throw new Error(`HTTP method not defined: ${route.method}`);
            }
        });
    }

    success(res, data) {
        return data;
    }

    mount() {
        this._app.use(this._path, this._router);
    }

    getRoutes() {
        throw new Error('The getRoutes function should be implemented by the classes children.');
    }

    controller(entityName) {
        if(!entityName) {
            throw new Error('Entity name should be defined in BaseRouter.js');
        }
        return new BaseController(new BaseService(new BaseDao(entityName)));
    }
}

export {
    GET,
    POST,
    PUT,
    DELETE,
}
