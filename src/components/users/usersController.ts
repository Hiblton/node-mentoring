import * as express from 'express';
import { createValidator } from 'express-joi-validation';

import { User, createUserSchema, updateUserSchema, UsersService } from './';

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

    createUser = (request: express.Request, response: express.Response): void => {
        const user: User = request.body;
        const createdUser: User = UsersService.createUser(user);
        response.json({ status: !!createdUser, user: createdUser });
    };

    getAutoSuggestUsers = (request: express.Request, response: express.Response): void => {
        const { loginSubstring, limit } = request.query;
        const users: User[] = UsersService.getAutoSuggestUsers(loginSubstring, limit);
        response.json(users);
    };

    getUserById = (request: express.Request, response: express.Response): void => {
        const { id } = request.params;
        const user: User = UsersService.getUserById(id);
        response.json(user);
    };

    updateUser = (request: express.Request, response: express.Response): void => {
        const user: User = request.body;
        const updatedUser: User = UsersService.updateUser(user);
        response.json({ status: !!updatedUser, user: updatedUser });
    };

    deleteUser = (request: express.Request, response: express.Response): void => {
        const { id } = request.params;
        const deletedUser: User = UsersService.deleteUser(id);
        response.json({ status: !!deletedUser, user: deletedUser });
    };
}
