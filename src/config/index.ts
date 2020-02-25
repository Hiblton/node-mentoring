import { development } from './development';
import { production } from './production';

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
}

export const config = {
    development,
    production,
}[env];
