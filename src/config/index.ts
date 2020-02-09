import { development } from './development';
import { production } from './production';

const env = process.env.NODE_ENV || 'development';

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
}

export const config = {
    development,
    production,
}[env];
