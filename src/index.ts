import { App } from './app';
import { UsersController } from './components/users';

const app = new App([new UsersController()], 5000);

app.listen();
