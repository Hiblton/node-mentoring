import { App } from './app';
import { config } from './config';

import { UsersController } from './controllers/users';
import { GroupsController } from './controllers/groups';

const app = new App([new UsersController(), new GroupsController()], config.app.port);

app.listen();
