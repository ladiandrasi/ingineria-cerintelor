import BaseController from "../base/controller/BaseController";
import BaseService from "../base/service/BaseService";
import BaseDao, {ENTITY_TYPES} from "../base/dao/BaseDao";

export default class ApplicationController extends BaseController {
    constructor(service) {
        super(service);
        this.postsService = new BaseService(new BaseDao(ENTITY_TYPES.POSTS));

    }
    async getFirmApplications({ userId }) {
        const posts = await this.postsService.findMany({ postedBy: userId });
        const postIds = posts.map(({_id})=> _id);
        return this.service.findMany({ postId: { $in: postIds } });
    }
}
