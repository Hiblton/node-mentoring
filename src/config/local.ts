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
};
