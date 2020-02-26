import express, { NextFunction, Request, Response } from 'express';
import { UserGroup } from '../models/userGroup';
import { UserGroupService } from '../services/userGroup';

export class UserGroupController {
    public path = '/users-group';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.post(this.path, this.addUsersToGroup);
    }

    async addUsersToGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { groupId, usersId } = request.body;
            const result: UserGroup[] = await UserGroupService.addUsersToGroup(groupId, usersId);
            response.json({ result });
        } catch (error) {
            response.statusCode = 400;
            next(error);
        }
    }
}
