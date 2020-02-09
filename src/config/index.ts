import { development } from './development';
import { production } from './production';

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

const env = process.env.NODE_ENV || 'development';

export const config = {
    development,
    production,
}[env];
