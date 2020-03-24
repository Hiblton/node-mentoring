import { Configuration } from './index';
import { localConfig } from './local';

export const test: Configuration = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || localConfig.app.port,
    },
    db: {
        host: process.env.TEST_DB_HOST || localConfig.db.host,
        port: parseInt(process.env.TEST_DB_PORT) || localConfig.db.port,
        name: process.env.TEST_DB_NAME || localConfig.db.name,
        secretLogin: process.env.TEST_DB_LOGIN || localConfig.db.secretLogin,
        secretPassword: process.env.TEST_DB_PASSWORD || localConfig.db.secretPassword,
    },
    logger: {
        logFilePath: process.env.TEST_LOGGER_LOG_FILE_PATH || localConfig.logger.logFilePath,
        maxFileSize: parseInt(process.env.TEST_LOGGER_MAX_FILE_SIZE) || localConfig.logger.maxFileSize,
        maxFiles: parseInt(process.env.TEST_LOGGER_MAX_FILES) || localConfig.logger.maxFiles,
    },
    auth: {
        secret: process.env.TEST_AUTH_SECRET || localConfig.auth.secret,
    },
};
