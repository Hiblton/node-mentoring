import { Application } from 'express';

import { App } from '../app';
import { config } from '../config';
import { LoggerService } from './logger';
import { User } from '../models/user';
import { AuthorizationService } from './authorization';
import { UsersService } from './users';

const USER_LOGIN = 'Bob Marley';
const USER_PASSWORD = 'qwerty';

export class TestingService {
    private static app: Application;
    private static token: string;
    private static user: User;

    public static initApp(controllers = []): Application {
        if (!TestingService.app || controllers.length) {
            TestingService.app = new App(controllers, config.app.port, new LoggerService()).app;
        }

        return TestingService.app;
    }

    public static async getToken(): Promise<string> {
        if (!TestingService.token) {
            TestingService.token = await AuthorizationService.signToken(await TestingService.getUser());
        }

        return TestingService.token;
    }

    public static setToken(token: string): void {
        TestingService.token = token;
    }

    public static async getUser(): Promise<User> {
        if (!TestingService.user) {
            TestingService.user = await UsersService.getUserByLoginAndPassword(USER_LOGIN, USER_PASSWORD);
        }

        return TestingService.user;
    }

    public static setUser(user: User): void {
        TestingService.user = user;
    }
}
