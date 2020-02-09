import { App } from './app';
import { UsersController } from './controllers/users';
import { config } from './config';

const app = new App([new UsersController()], config.app.port);

app.listen();
