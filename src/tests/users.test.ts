import request from 'supertest';
import uuidv4 from 'uuid/v4';

import { Application } from 'express';
import { UsersController } from '../controllers/users';
import { User } from '../models/user';
import { TestingService } from '../services/testing';

let app: Application;
let user: User;
let token: string;

beforeAll(async () => {
    app = TestingService.initApp([new UsersController()]);
    user = await TestingService.getUser();
    token = await TestingService.getToken();
});

describe('The UsersController', () => {
    describe('Get /users?loginSubstring=&limit=', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .get(`/users?loginSubstring=&limit=`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 200 OK and empty array if query params are empty', done => {
            return request(app)
                .get(`/users?loginSubstring=&limit=`)
                .set('authorization', token)
                .expect(200, { users: [] }, done);
        });

        it('responds 200 OK and Users array if query params are set', done => {
            return request(app)
                .get(`/users?loginSubstring=Bob&limit=1`)
                .set('authorization', token)
                .expect(200, { users: [user.get()] }, done);
        });
    });

    describe('Get /users/id', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .get(`/users/${uuidv4()}`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if id (uuid) is incorrect', done => {
            return request(app)
                .get(`/users/${uuidv4()}abc`)
                .set('authorization', token)
                .expect(400, done);
        });

        it('responds 200 OK and empty User odject if id (uuid) is not exist', done => {
            return request(app)
                .get(`/users/${uuidv4()}`)
                .set('authorization', token)
                .expect(200, { user: null }, done);
        });

        it('responds 200 OK and User object if id (uuid) is correct', done => {
            return request(app)
                .get(`/users/${user.id}`)
                .set('authorization', token)
                .expect(200, { user: user.get() }, done);
        });
    });

    describe('Post /users', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .post(`/users`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if body(User object) is empty', done => {
            return request(app)
                .post(`/users`)
                .set('authorization', token)
                .send({})
                .expect(400, done);
        });

        it('responds 400 Bad request if body(User object) is invalid', done => {
            const invalidRequest = {
                login: 1234,
                password: false,
            };
            return request(app)
                .post(`/users`)
                .set('authorization', token)
                .send(invalidRequest)
                .expect(400, done);
        });

        it('responds 200 OK and User object if body(User object) is valid', done => {
            const body = {
                login: 'login',
                password: 'password',
                age: 18,
                isDeleted: false,
            };
            return request(app)
                .post(`/users`)
                .set('authorization', token)
                .send(body)
                .expect(response => {
                    const { status, user } = response.body;
                    delete user.id;
                    expect(status).toBe(true);
                    expect(user).toStrictEqual(body);
                })
                .expect(200, done);
        });
    });

    describe('Put /users', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .put(`/users`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if body(User object) is empty', done => {
            return request(app)
                .put(`/users`)
                .set('authorization', token)
                .send({})
                .expect(400, done);
        });

        it('responds 400 Bad request if body(User object) is invalid', done => {
            const invalidRequest = {
                login: 1234,
                password: false,
            };
            return request(app)
                .put(`/users`)
                .set('authorization', token)
                .send(invalidRequest)
                .expect(400, done);
        });

        it('responds 200 OK and User object if body(User object) is valid', done => {
            const body = {
                ...user.get(),
                age: 21,
            };
            return request(app)
                .put(`/users`)
                .set('authorization', token)
                .send(body)
                .expect(response => {
                    const { status, user } = response.body;
                    expect(status).toBe(true);
                    expect(user).toStrictEqual(body);
                })
                .expect(200, done);
        });
    });

    describe('Delete /users/id', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .delete(`/users/${uuidv4()}`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if id (uuid) is incorrect', done => {
            return request(app)
                .delete(`/users/${uuidv4()}abc`)
                .set('authorization', token)
                .expect(400, done);
        });

        it('responds 200 OK and empty User odject if id (uuid) is not exist', done => {
            return request(app)
                .delete(`/users/${uuidv4()}`)
                .set('authorization', token)
                .expect(response => {
                    const { status, user } = response.body;
                    expect(status).toBe(false);
                    expect(user).toBe(null);
                })
                .expect(200, done);
        });

        it('responds 200 OK and User object if id (uuid) is correct', done => {
            return request(app)
                .delete(`/users/${user.id}`)
                .set('authorization', token)
                .expect(response => {
                    const { status, user } = response.body;
                    expect(status).toBe(true);
                    expect(user.isDeleted).toBe(true);
                })
                .expect(200, done);
        });
    });
});
