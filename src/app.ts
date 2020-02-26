import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Logger } from './services/logger';

export class App {
    public app: express.Application;
    public port: number;
    public logger: Logger;

    constructor(controllers, port, logger) {
        this.app = express();
        this.port = port;
        this.logger = logger;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeLogger();
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private initializeLogger(): void {
        this.app.use((error: Error, request: Request, response: Response, next: NextFunction): void => {
            if (!error) {
                next();
            }

            response.sendStatus(response.statusCode || 500);
            this.logger.error(error.name, error);
        });

        process.on('uncaughtException', err => this.logger.error('Uncaught exception', err));
        process.on('unhandledRejection', reason => this.logger.error('Unhandled rejection', reason));
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            this.logger.info(`App listening on the port ${this.port}`);
        });
    }
}
