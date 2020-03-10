import express, { NextFunction, Request, Response } from 'express';
import { createValidator } from 'express-joi-validation';

import { User } from '../models/user';
import { UsersService } from '../services/users';
import { createUserSchema, updateUserSchema } from '../validators/user';

export class UsersController {
    public path = '/users';
    public router = express.Router();
    public validator = createValidator();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(this.path, this.getAutoSuggestUsers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.post(this.path, this.validator.body(createUserSchema), this.createUser);
        this.router.put(this.path, this.validator.body(updateUserSchema), this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    async getAutoSuggestUsers(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { loginSubstring, limit } = request.query;
            const users: User[] = await UsersService.getAutoSuggestUsers(loginSubstring, limit);
            response.json({ users });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async getUserById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = request.params;
            const user: User = await UsersService.getUserById(id);
            response.json({ user });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async createUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user: User = request.body;
            const createdUser: User = await UsersService.createUser(user);
            response.json({ status: !!createdUser, user: createdUser });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async updateUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user: User = request.body;
            const updatedUser: User = await UsersService.updateUser(user);
            response.json({ status: !!updatedUser, user: updatedUser });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }

    async deleteUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = request.params;
            const deletedUser: User = await UsersService.deleteUser(id);
            response.json({ status: !!deletedUser, user: deletedUser });
        } catch (error) {
            next({ error, errorCode: 400 });
        }
    }
}
