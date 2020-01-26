import { App } from './app';
import { UsersController } from './controllers/users';

const app = new App([new UsersController()], 5000);

app.listen();
