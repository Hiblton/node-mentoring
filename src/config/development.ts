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
    logger: {
        logFilePath: process.env.DEV_LOGGER_LOG_FILE_PATH || localConfig.logger.logFilePath,
        maxFileSize: parseInt(process.env.DEV_LOGGER_MAX_FILE_SIZE) || localConfig.logger.maxFileSize,
        maxFiles: parseInt(process.env.DEV_LOGGER_MAX_FILES) || localConfig.logger.maxFiles,
    },
    auth: {
        secret: process.env.DEV_AUTH_SECRET || localConfig.auth.secret,
    },
};
