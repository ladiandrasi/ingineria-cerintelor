import BaseRouter, {GET, POST, PUT} from "../base/route/BaseRouter";
import { ENTITY_TYPES } from "../base/dao/BaseDao";

export default class UserRoutes extends BaseRouter{
    getRoutes() {
        return [
            {
                method: GET,
                path: '/',
                function: this._get.bind(this),
            },
            {
                method: GET,
                path: '/:userId',
                function: this._getOne.bind(this),
            },
            {
                method: POST,
                path: '/',
                function: this._insertOne.bind(this),
            },
            {
                method: PUT,
                path: '/:userId',
                function: this._updateOne.bind(this),
            },
        ]
    }

    controller(){
        return super.controller(ENTITY_TYPES.USERS);
    }

    async _get(req, res, next) {
        try {
            const result = await this.controller().findMany({});
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _getOne(req, res, next) {
        try {
            const { params } = req;
            const { userId } = params;
            const result = await this.controller().findOne({ _id: userId });
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _insertOne(req, res, next) {
        try {
            const { body: entity} = req;
            const result = await this.controller().insertOne(entity);
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _updateOne(req, res, next) {
        try {
            const { params } = req;
            const { userId } = params;
            const { body: updatedEntity } = req;
            const query = { _id: userId };
            const result = await this.controller().updateOne(query, updatedEntity);
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }
}
