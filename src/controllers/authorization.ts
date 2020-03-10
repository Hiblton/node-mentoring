import express, { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization';
import { UsersService } from '../services/users';

export class AuthorizationController {
    public path = '/auth';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.post(`${this.path}/login`, this.login);
    }

    async login(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { login, password } = request.body;

            const user: User = await UsersService.getUserByLoginAndPassword(login, password);
            if (!user) {
                next({ error: Error('Bad request'), errorCode: 400 });
            }

            response.json({ token: AuthorizationService.signToken(user) });
        } catch (error) {
            next({ error, errorCode: 401 });
        }
    }
}
