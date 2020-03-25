import request from 'supertest';
import { App } from '../app';
import { config } from '../config';
import { UsersController } from '../controllers/users';
import { User } from '../models/user';
import { LoggerService } from '../services/logger';
import { AuthorizationService } from '../services/authorization';
import { UsersService } from '../services/users';

const USER_LOGIN = 'Bob Marley';
const USER_PASSWORD = 'qwerty';

let app: App;
let testUser: User;
let token: string;

beforeAll(async () => {
    app = new App([new UsersController()], config.app.port, new LoggerService());
    testUser = await UsersService.getUserByLoginAndPassword(USER_LOGIN, USER_PASSWORD);
    token = await AuthorizationService.signToken(testUser);
});

describe('The UsersController', () => {
    describe('Get /users?loginSubstring=&limit=', () => {
        it('responds 401 Not Authorised with missed auth token', done => {
            return request(app.app)
                .get(`/users?loginSubstring=&limit=`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds empty array with empty query params', done => {
            return request(app.app)
                .get(`/users?loginSubstring=&limit=`)
                .set('authorization', token)
                .expect(200, { users: [] }, done);
        });

        it('responds 200 OK and Users array with set query params', done => {
            return request(app.app)
                .get(`/users?loginSubstring=Bob&limit=1`)
                .set('authorization', token)
                .expect(200, { users: [testUser.get()] }, done);
        });
    });

    describe('Get /users/id', () => {
        it('responds 401 Not Authorised with missed auth token', done => {
            return request(app.app)
                .get(`/users/${testUser.id}`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request with incorrect id (guid)', done => {
            return request(app.app)
                .get(`/users/${testUser.id}abc`)
                .set('authorization', token)
                .expect(400, done);
        });

        it('responds 200 OK and User object with correct id (guid)', done => {
            return request(app.app)
                .get(`/users/${testUser.id}`)
                .set('authorization', token)
                .expect(200, { user: testUser.get() }, done);
        });
    });
});
