import express, { NextFunction, Request, Response } from 'express';
import { createValidator } from 'express-joi-validation';

import { Group } from '../models/group';
import { GroupsService } from '../services/groups';
import { AuthorizationService } from '../services/authorization';
import { createGroupSchema, updateGroupSchema } from '../validators/group';

export class GroupsController {
    public path = '/groups';
    public router = express.Router();
    public validator = createValidator();

    constructor() {
        this.initializeMiddleware();
        this.initializeRouter();
    }

    public initializeMiddleware(): void {
        this.router.use(AuthorizationService.checkToken);
    }

    public initializeRouter(): void {
        this.router.get(this.path, this.getAllGroups);
        this.router.get(`${this.path}/:id`, this.getGroupById);
        this.router.post(this.path, this.validator.body(createGroupSchema), this.createGroup);
        this.router.put(this.path, this.validator.body(updateGroupSchema), this.updateGroup);
        this.router.delete(`${this.path}/:id`, this.deleteGroup);
    }

    async getAllGroups(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const groups: Group[] = await GroupsService.getAllGroups();
            response.json({ groups });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async getGroupById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = request.params;
            const group: Group = await GroupsService.getGroupById(id);
            response.json({ group });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async createGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const group: Group = request.body;
            const createdGroup: Group = await GroupsService.createGroup(group);
            response.json({ status: !!createdGroup, group: createdGroup });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async updateGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const group: Group = request.body;
            const updatedGroup: Group = await GroupsService.updateGroup(group);
            response.json({ status: !!updatedGroup, group: updatedGroup });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async deleteGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = request.params;
            const countDeletedRows: number = await GroupsService.deleteGroup(id);
            response.json({ status: !!countDeletedRows });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }
}
