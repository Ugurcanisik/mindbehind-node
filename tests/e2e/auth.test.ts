import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import app from '../../src/app';
import request from 'supertest';

const wait = (timeout: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

const successLoginData = {
    userName: 'USR-TEST-1',
    password: 'test'
};

const failUserNameLoginData = {
    userName: 'USR-TEST-10',
    password: 'test'
};

const failPasswordLoginData = {
    userName: 'USR-TEST-1',
    password: 'USR-TEST-10'
};

before(async () => {
    console.log('Wait For DB Start');
    await wait(2000);
    console.log('Wait For DB End');
});

describe('Authentication Api Tests', () => {
    describe('Login', () => {
        it('Should return 200', async () => {
            const { body } = await request(app).post('/api/v1/auth/login').send(successLoginData).expect(200);

            expect(body).to.have.property('data').to.be.an('object');
            expect(body.data).to.have.property('user').to.be.a('object');
            expect(body.data.user).to.have.property('userNumber').to.be.a('string');
            expect(body.data.user).to.have.property('userName').to.be.a('string');
            expect(body.data.user).to.have.property('role').to.be.a('string');
            expect(body.data.user).to.have.property('token').to.be.a('string');
        });

        it('Username is wrong should return 401', async () =>
            request(app).post('/api/v1/auth/login').send(failUserNameLoginData).expect(401));

        it('Password is wrong should return 401', async () =>
            request(app).post('/api/v1/auth/login').send(failPasswordLoginData).expect(401));
    });
});
