import BaseRouter, {GET, POST, PUT} from "../base/route/BaseRouter";
import { ENTITY_TYPES } from "../base/dao/BaseDao";

export default class PostAuthorRoutes extends BaseRouter{
    getRoutes() {
        return [
            {
                method: GET,
                path: '/:userId',
                function: this._getOne.bind(this),
            },
        ]
    }

    controller(){
        return super.controller(ENTITY_TYPES.USERS);
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
}
