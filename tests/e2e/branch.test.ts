import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import app from '../../src/app';
import request from 'supertest';
import { auth as authService } from '@services';

const branchNumber = 'BRC-112233441';
const notFoundBranchNumber = 'BRC-112233499';

const updateBranchData = {
    branchNumber: 'BRC-112233441',
    name: 'Update Branch',
    fullAddress: 'Update Address',
    phone: 'Update Phone',
    latitude: 9.1234,
    longitude: -79.1234
};

const ownerLoginData = {
    userName: 'USR-TEST-1',
    password: 'test'
};

const employeeLoginData = {
    userName: 'USR-TEST-2',
    password: 'test'
};

describe('Branches Api Tests', () => {
    let ownerJwtToken: string;
    let employeeJwtToken: string;
    const notValidJWTToken = 'Bearer not-valid-jwt-token';

    before(async () => {
        const { token: ownerToken } = await authService.login(ownerLoginData);
        const { token: employeeToken } = await authService.login(employeeLoginData);
        ownerJwtToken = ownerToken;
        employeeJwtToken = employeeToken;
    });

    describe('Get Branches', () => {
        it('Get branches should return 200', async () => {
            const { body } = await request(app)
                .get('/api/v1/branches/')
                .set('Authorization', ownerJwtToken)
                .expect(200);

            expect(body).to.have.property('data').to.be.an('object');
            expect(body.data).to.have.property('branches').to.be.an('array').that.is.not.empty;
            body.data.branches.forEach((branch: any) => {
                expect(branch).to.have.property('branchNumber').to.be.a('string');
                expect(branch).to.have.property('latitude').to.be.a('number');
                expect(branch).to.have.property('longitude').to.be.a('number');
                expect(branch).to.have.property('name').to.be.a('string');
                expect(branch).to.have.property('fullAddress').to.be.a('string');
                expect(branch).to.have.property('phone').to.be.a('string');
            });
        });

        it('Get branches not valid token should return 401', async () =>
            request(app).get('/api/v1/branches').set('Authorization', notValidJWTToken).expect(401));
    });

    describe('Get Branch Detail', () => {
        it('Get branch detail should return 200', async () => {
            const { body } = await request(app)
                .get(`/api/v1/branches/${branchNumber}`)
                .set('Authorization', ownerJwtToken)
                .expect(200);

            expect(body).to.have.property('data').to.be.an('object');
            expect(body.data).to.have.property('branch').to.be.an('object');
            expect(body.data.branch).to.have.property('branchNumber').to.be.a('string');
            expect(body.data.branch).to.have.property('latitude').to.be.a('number');
            expect(body.data.branch).to.have.property('longitude').to.be.a('number');
            expect(body.data.branch).to.have.property('name').to.be.a('string');
            expect(body.data.branch).to.have.property('fullAddress').to.be.a('string');
            expect(body.data.branch).to.have.property('phone').to.be.a('string');
        });

        it('Get branch detail not found branch should return 404', async () =>
            request(app)
                .get(`/api/v1/branches/${notFoundBranchNumber}`)
                .set('Authorization', ownerJwtToken)
                .expect(404));

        it('Permission failed should return 403', async () =>
            request(app).get(`/api/v1/branches/${branchNumber}`).set('Authorization', employeeJwtToken).expect(403));

        it('Get branch detail not valid token should return 401', async () =>
            request(app).get(`/api/v1/branches/${branchNumber}`).set('Authorization', notValidJWTToken).expect(401));
    });

    describe('Update Branch', () => {
        it('Should return 200', async () =>
            request(app)
                .patch(`/api/v1/branches/${branchNumber}`)
                .send(updateBranchData)
                .set('Authorization', ownerJwtToken)
                .expect(200));

        it('Not found branch should return 404', async () =>
            request(app)
                .patch(`/api/v1/branches/${notFoundBranchNumber}`)
                .send(updateBranchData)
                .set('Authorization', ownerJwtToken)
                .expect(404));

        it('Permission fail should return 401', async () =>
            request(app).patch(`/api/v1/branches/${branchNumber}`).set('Authorization', employeeJwtToken).expect(401));
    });
});
