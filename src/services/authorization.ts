import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from './../config';
import { User } from '../models/user';

export class AuthorizationService {
    public static signToken(user: User): Promise<string> {
        return jwt.sign(user.toJSON(), config.auth.secret, { expiresIn: '1h' });
    }

    public static checkToken(request: Request, response: Response, next: NextFunction): void {
        const token = request.headers['authorization'];
        if (!token) {
            next({ error: Error('Auth token is not found'), errorCode: 401 });
        }

        try {
            // eslint-disable-next-line
            jwt.verify(token, config.auth.secret, (error: any) => {
                if (error) {
                    next({ error, errorCode: 403 });
                }

                next();
            });
        } catch (error) {
            next({ error });
        }
    }
}
