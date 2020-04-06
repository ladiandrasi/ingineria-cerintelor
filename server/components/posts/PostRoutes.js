import BaseRouter, {DELETE, GET, POST, PUT} from "../base/route/BaseRouter";
import { ENTITY_TYPES } from "../base/dao/BaseDao";
import { ObjectId } from 'mongodb';

export default class PostRoutes extends BaseRouter{
    getRoutes() {
        return [
            {
                method: GET,
                path: '/',
                function: this._get.bind(this),
            },
            {
                method: GET,
                path: '/:postId',
                function: this._getOne.bind(this),
            },
            {
                method: POST,
                path: '/',
                function: this._insertOne.bind(this),
            },
            {
                method: PUT,
                path: '/:postId',
                function: this._updateOne.bind(this),
            },
            {
                method: DELETE,
                path: '/:postId',
                function: this._deleteOne.bind(this),
            },
        ]
    }

    controller(){
        return super.controller(ENTITY_TYPES.POSTS);
    }

    async _get(req, res, next) {
        try {
            const { query } = req;
            const { filter } = query;
            const filterQuery = filter
                ? { jobTitle: {$regex : new RegExp(`.*${filter}.*`,"i")}}
                : {};
            const result = await this.controller().findMany(filterQuery);
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _getOne(req, res, next) {
        try {
            const { params } = req;
            const { postId } = params;
            const result = await this.controller().findOne({ _id: postId });
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
            const { postId } = params;
            const { body: updatedEntity } = req;
            const query = { _id: postId };
            const result = await this.controller().updateOne(query, updatedEntity);
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _deleteOne(req, res, next) {
        try {
            const { params } = req;
            const { postId } = params;
            const result = await this.controller().deleteOne({ _id: postId });
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }
}
