import * as express from 'express';
import { createValidator } from 'express-joi-validation';

import { User, UsersService, createUserSchema, updateUserSchema } from './';

export class UsersController {
    public path = '/users';
    public router = express.Router();
    public validator = createValidator();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.post(this.path, this.validator.body(createUserSchema), this.createUser);
        this.router.get(this.path, this.getAutoSuggestUsers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.put(this.path, this.validator.body(updateUserSchema), this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    async createUser(request: express.Request, response: express.Response): Promise<void> {
        const user: User = request.body;
        const createdUser: User = await UsersService.createUser(user);
        response.json({ status: !!createdUser, user: createdUser });
    }

    async getAutoSuggestUsers(request: express.Request, response: express.Response): Promise<void> {
        const { loginSubstring, limit } = request.query;
        const users: User[] = await UsersService.getAutoSuggestUsers(loginSubstring, limit);
        response.json({ users });
    }

    async getUserById(request: express.Request, response: express.Response): Promise<void> {
        const { id } = request.params;
        const user: User = await UsersService.getUserById(id);
        response.json({ user });
    }

    async updateUser(request: express.Request, response: express.Response): Promise<void> {
        const user: User = request.body;
        const updatedUser: User = await UsersService.updateUser(user);
        response.json({ status: !!updatedUser, user: updatedUser });
    }

    async deleteUser(request: express.Request, response: express.Response): Promise<void> {
        const { id } = request.params;
        const deletedUser: User = await UsersService.deleteUser(id);
        response.json({ status: !!deletedUser, user: deletedUser });
    }
}
