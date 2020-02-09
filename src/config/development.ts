import { Configuration } from './index';

export const development: Configuration = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 5000,
    },
    db: {
        host: process.env.DEV_DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DEV_DB_PORT) || 5432,
        name: process.env.DEV_DB_NAME || 'module3',
        secretLogin: process.env.DEV_DB_LOGIN || 'postgres',
        secretPassword: process.env.DEV_DB_PASSWORD || 'postgres',
    },
};
