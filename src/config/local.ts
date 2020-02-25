import { Configuration } from './index';

export const localConfig: Configuration = {
    app: {
        port: 5000,
    },
    db: {
        host: '127.0.0.1',
        port: 5432,
        name: 'node_mentoring',
        secretLogin: 'postgres',
        secretPassword: 'postgres',
    },
    logger: {
        logFilePath: 'logs/app.log',
        maxFileSize: 10 * 1024 * 1024, // 10MB,
        maxFiles: 5,
    },
};
