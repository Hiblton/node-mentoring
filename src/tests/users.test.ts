import request from 'supertest';
import { App } from '../app';
import { config } from '../config';
import { UsersController } from '../controllers/users';
import { User } from '../models/user';
import { LoggerService } from '../services/logger';
import { AuthorizationService } from '../services/authorization';
import { UsersService } from '../services/users';

const testUser = {
    id: 'b0a8eac2-61f6-4886-bc18-09caf8a37249',
    login: 'Bob Marley',
    password: 'qwerty',
    age: 80,
    isDeleted: false,
};

let token = '';
let app: App;

beforeAll(async () => {
    const user: User = await UsersService.getUserByLoginAndPassword(testUser.login, testUser.password);
    token = await AuthorizationService.signToken(user);

    app = new App([new UsersController()], config.app.port, new LoggerService());
});

describe('The UsersController', () => {
    describe('Get /users/id', () => {
        it('with missed auth token', done => {
            return request(app.app)
                .get(`/users/${testUser.id}`)
                .set('authorization', '')
                .send({ headers: token })
                .expect(401, done);
        });

        it('with correct id (guid)', done => {
            return request(app.app)
                .get(`/users/${testUser.id}`)
                .set('authorization', token)
                .send({ headers: token })
                .expect(200, { user: testUser }, done);
        });

        it('with uncorrect id (guid)', done => {
            return request(app.app)
                .get(`/users/${testUser.id}abc`)
                .set('authorization', token)
                .send({ headers: token })
                .expect(400, done);
        });
    });
});
