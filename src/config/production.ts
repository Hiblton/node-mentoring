import { Configuration } from './index';

export const production: Configuration = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 5000,
    },
    db: {
        host: process.env.PROD_DB_HOST || '127.0.0.1',
        port: parseInt(process.env.PROD_DB_PORT) || 5432,
        name: process.env.PROD_DB_NAME || 'module3',
        secretLogin: process.env.PROD_DB_LOGIN || 'postgres',
        secretPassword: process.env.PROD_DB_PASSWORD || 'postgres',
    },
};
