import { Configuration } from './index';
import { localConfig } from './local';

export const production: Configuration = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || localConfig.app.port,
    },
    db: {
        host: process.env.PROD_DB_HOST || localConfig.db.host,
        port: parseInt(process.env.PROD_DB_PORT) || localConfig.db.port,
        name: process.env.PROD_DB_NAME || localConfig.db.name,
        secretLogin: process.env.PROD_DB_LOGIN || localConfig.db.secretLogin,
        secretPassword: process.env.PROD_DB_PASSWORD || localConfig.db.secretPassword,
    },
    logger: {
        logFilePath: process.env.PROD_LOGGER_LOG_FILE_PATH || localConfig.logger.logFilePath,
        maxFileSize: parseInt(process.env.v_LOGGER_MAX_FILE_SIZE) || localConfig.logger.maxFileSize,
        maxFiles: parseInt(process.env.PROD_LOGGER_MAX_FILES) || localConfig.logger.maxFiles,
    },
};
