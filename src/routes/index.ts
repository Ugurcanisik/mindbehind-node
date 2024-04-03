import { Router } from 'express';
import authRoute from './auth';
import branchRoute from './branch';

const appRoute = Router();

appRoute.use('/auth', authRoute);
appRoute.use('/branches', branchRoute);

export default appRoute;
