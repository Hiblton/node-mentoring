import request from 'supertest';
import uuidv4 from 'uuid/v4';

import { Application } from 'express';
import { GroupsController } from '../controllers/groups';
import { TestingService } from '../services/testing';
import { Group } from '../models/group';

let app: Application;
let group: Group;
let token: string;

beforeAll(async () => {
    app = TestingService.initApp([new GroupsController()]);
    token = await TestingService.getToken();
});

describe('The GroupsController', () => {
    describe('Get /groups', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .get(`/groups`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 200 OK and Groups array if query params are set', done => {
            return request(app)
                .get(`/groups`)
                .set('authorization', token)
                .expect(response => {
                    const { groups } = response.body;
                    expect(groups.length).toBe(3);
                    group = groups[0];
                })
                .expect(200, done);
        });
    });

    describe('Get /groups/id', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .get(`/groups/${uuidv4()}`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if id (uuid) is incorrect', done => {
            return request(app)
                .get(`/groups/${uuidv4()}abc`)
                .set('authorization', token)
                .expect(400, done);
        });

        it('responds 200 OK and empty Group odject if id (uuid) is not exist', done => {
            return request(app)
                .get(`/groups/${uuidv4()}`)
                .set('authorization', token)
                .expect(200, { group: null }, done);
        });

        it('responds 200 OK and Group object if id (uuid) is correct', done => {
            return request(app)
                .get(`/groups/${group.id}`)
                .set('authorization', token)
                .expect(200, { group: group }, done);
        });
    });

    describe('Post /groups', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .post(`/groups`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if body(Group object) is empty', done => {
            return request(app)
                .post(`/groups`)
                .set('authorization', token)
                .send({})
                .expect(400, done);
        });

        it('responds 400 Bad request if body(Group object) is invalid', done => {
            const invalidRequest = {
                name: 1234,
                permissions: false,
            };
            return request(app)
                .post(`/groups`)
                .set('authorization', token)
                .send(invalidRequest)
                .expect(400, done);
        });

        it('responds 200 OK and Group object if body(Group object) is valid', done => {
            const body = {
                name: 'Test',
                permissions: ['CREATE'],
            };
            return request(app)
                .post(`/groups`)
                .set('authorization', token)
                .send(body)
                .expect(response => {
                    const { status, group } = response.body;
                    delete group.id;
                    expect(status).toBe(true);
                    expect(group).toStrictEqual(body);
                })
                .expect(200, done);
        });
    });

    describe('Put /groups', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .put(`/groups`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if body(Group object) is empty', done => {
            return request(app)
                .put(`/groups`)
                .set('authorization', token)
                .send({})
                .expect(400, done);
        });

        it('responds 400 Bad request if body(Group object) is invalid', done => {
            const invalidRequest = {
                name: 1234,
                permissions: false,
            };
            return request(app)
                .put(`/groups`)
                .set('authorization', token)
                .send(invalidRequest)
                .expect(400, done);
        });

        it('responds 200 OK and Group object if body(Group object) is valid', done => {
            const body = {
                ...group,
                permissions: ['UPDATE'],
            };
            return request(app)
                .put(`/groups`)
                .set('authorization', token)
                .send(body)
                .expect(response => {
                    const { status, group } = response.body;
                    expect(status).toBe(true);
                    expect(group).toStrictEqual(body);
                })
                .expect(200, done);
        });
    });

    describe('Delete /groups/id', () => {
        it('responds 401 Not Authorised if auth token is missed', done => {
            return request(app)
                .delete(`/groups/${uuidv4()}`)
                .set('authorization', '')
                .expect(401, done);
        });

        it('responds 400 Bad request if id (uuid) is incorrect', done => {
            return request(app)
                .delete(`/groups/${uuidv4()}abc`)
                .set('authorization', token)
                .expect(400, done);
        });

        it('responds 200 OK and empty Group odject if id (uuid) is not exist', done => {
            return request(app)
                .delete(`/groups/${uuidv4()}`)
                .set('authorization', token)
                .expect(response => {
                    const { status } = response.body;
                    expect(status).toBe(false);
                })
                .expect(200, done);
        });

        it('responds 200 OK and Group object if id (uuid) is correct', done => {
            return request(app)
                .delete(`/groups/${group.id}`)
                .set('authorization', token)
                .expect(response => {
                    const { status } = response.body;
                    expect(status).toBeDefined();
                })
                .expect(200, done);
        });
    });
});
