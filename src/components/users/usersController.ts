import * as express from 'express';

import { User, UsersService } from './';

export class UsersController {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.post(this.path, this.createUser);
        this.router.get(this.path, this.getAutoSuggestUsers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.patch(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    createUser = (request: express.Request, response: express.Response): void => {
        const user: User = request.body;
        const status: boolean = UsersService.createUser(user);
        response.json({ status });
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
        const { id } = request.params;
        const user: User = request.body;
        const status: boolean = UsersService.updateUser(id, user);
        response.json({ status });
    };

    deleteUser = (request: express.Request, response: express.Response): void => {
        const { id } = request.params;
        const status: boolean = UsersService.deleteUser(id);
        response.json({ status });
    };
}
