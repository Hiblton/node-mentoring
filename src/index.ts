import { App } from './app';
import { config } from './config';

import { AuthorizationController } from './controllers/authorization';
import { UsersController } from './controllers/users';
import { GroupsController } from './controllers/groups';
import { UserGroupController } from './controllers/userGroup';
import { LoggerService } from './services/logger';

const app = new App(
    [new AuthorizationController(), new UsersController(), new GroupsController(), new UserGroupController()],
    config.app.port,
    new LoggerService(),
);

app.listen();
