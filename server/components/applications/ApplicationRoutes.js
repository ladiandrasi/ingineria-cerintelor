import BaseRouter, {DELETE, GET, POST, PUT} from "../base/route/BaseRouter";
import BaseDao, { ENTITY_TYPES } from "../base/dao/BaseDao";
import { ObjectId } from 'mongodb';
import BaseController from "../base/controller/BaseController";
import BaseService from "../base/service/BaseService";
import ApplicationController from "./ApplicationController";

export default class ApplicationRoutes extends BaseRouter{
    getRoutes() {
        return [
            {
                method: GET,
                path: '/student/:userId',
                function: this._getStudentApplications.bind(this),
            },
            {
                method: GET,
                path: '/firm/:userId',
                function: this._getFirmApplications.bind(this),
            },
            {
                method: GET,
                path: '/:applicationId',
                function: this._getOne.bind(this),
            },
            {
                method: POST,
                path: '/',
                function: this._insertOne.bind(this),
            },
            {
                method: PUT,
                path: '/:applicationId',
                function: this._updateOne.bind(this),
            },
            {
                method: DELETE,
                path: '/:applicationId',
                function: this._deleteOne.bind(this),
            },
        ]
    }

    controller(){
        return new ApplicationController(new BaseService(new BaseDao(ENTITY_TYPES.APPLICATIONS)));
    }

    async _getStudentApplications(req, res, next) {
        try {
            const { params } = req;
            const { userId } = params;
            const result = await this.controller().findMany({ userId });
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _getFirmApplications(req, res, next) {
        try {
            const { params } = req;
            const { userId } = params;
            const result = await this.controller().getFirmApplications({ userId });
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _getOne(req, res, next) {
        try {
            const { params } = req;
            const { applicationId } = params;
            const result = await this.controller().findOne({ _id: applicationId });
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
            const { applicationId } = params;
            const { body: updatedEntity } = req;
            const query = { _id: applicationId };
            const result = await this.controller().updateOne(query, updatedEntity);
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }

    async _deleteOne(req, res, next) {
        try {
            const { params } = req;
            const { applicationId } = params;
            const result = await this.controller().deleteOne({ _id: ObjectId(applicationId) });
            res.status(200).json(this.success(res, result));
        } catch (error) {
            next(error);
        }
    }
}
