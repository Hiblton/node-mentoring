import { createLogger, transports, format, Logger as WinstonLogger } from 'winston';
import { config } from './../config';

export declare type Logger = WinstonLogger;

export declare interface CustomError {
    error: Error;
    errorCode?: number;
}

const dateFormat = (): string => {
    return new Date(Date.now()).toUTCString();
};

export class LoggerService {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: config.logger.logFilePath,
                    handleExceptions: true,
                    maxsize: config.logger.maxFileSize,
                    maxFiles: config.logger.maxFiles,
                }),
            ],
            format: format.printf(log => {
                const message = `${dateFormat()} | ${log.level.toUpperCase()} | ${log.message}`;
                return log.obj ? `${message} | data:${JSON.stringify(log.obj)} | ` : message;
            }),
        });
    }

    // eslint-disable-next-line
    info(message: string, obj: any): void {
        this.logger.log('info', message, obj);
    }

    // eslint-disable-next-line
    debug(message: string, obj: any): void {
        this.logger.log('debug', message, obj);
    }

    // eslint-disable-next-line
    warn(message: string, obj: any): void {
        this.logger.log('warn', message, obj);
    }

    // eslint-disable-next-line
    error(message: string, obj: any): void {
        this.logger.log('error', message, obj);
    }
}
