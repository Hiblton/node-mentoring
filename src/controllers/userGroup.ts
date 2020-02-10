import * as express from 'express';
import { UserGroup } from '../models/userGroup';
import { UserGroupService } from '../services/userGroup';

export class UserGroupController {
    public path = '/users-group';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.post(this.path, this.addUsersToGroup);
    }

    async addUsersToGroup(request: express.Request, response: express.Response): Promise<void> {
        const { groupId, usersId } = request.body;
        const result: UserGroup[] = await UserGroupService.addUsersToGroup(groupId, usersId);
        response.json({ result });
    }
}
