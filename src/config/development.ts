import { Configuration } from './index';
import { localConfig } from './local';

export const development: Configuration = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || localConfig.app.port,
    },
    db: {
        host: process.env.DEV_DB_HOST || localConfig.db.host,
        port: parseInt(process.env.DEV_DB_PORT) || localConfig.db.port,
        name: process.env.DEV_DB_NAME || localConfig.db.name,
        secretLogin: process.env.DEV_DB_LOGIN || localConfig.db.secretLogin,
        secretPassword: process.env.DEV_DB_PASSWORD || localConfig.db.secretPassword,
    },
};
