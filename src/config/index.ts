import { development } from './development';
import { production } from './production';
import { test } from './test';

export const env = process.env.NODE_ENV || 'development';

export interface Configuration {
    app: {
        port: number;
    };
    db: {
        host: string;
        port: number;
        name: string;
        secretLogin?: string;
        secretPassword?: string;
    };
    logger: {
        logFilePath: string;
        maxFileSize?: number;
        maxFiles?: number;
    };
    auth: {
        secret?: string;
    };
}

export const config = {
    development,
    production,
    test,
}[env];
