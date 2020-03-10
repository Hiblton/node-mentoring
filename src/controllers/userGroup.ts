import express, { NextFunction, Request, Response } from 'express';
import { AuthorizationService } from '../services/authorization';
import { UserGroup } from '../models/userGroup';
import { UserGroupService } from '../services/userGroup';

export class UserGroupController {
    public path = '/users-group';
    public router = express.Router();

    constructor() {
        this.initializeMiddleware();
        this.initializeRouter();
    }

    public initializeMiddleware(): void {
        this.router.use(AuthorizationService.checkToken);
    }

    public initializeRouter(): void {
        this.router.post(this.path, this.addUsersToGroup);
    }

    async addUsersToGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { groupId, usersId } = request.body;
            const result: UserGroup[] = await UserGroupService.addUsersToGroup(groupId, usersId);
            response.json({ result });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }
}
