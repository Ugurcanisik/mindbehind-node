import { Router } from 'express';
import * as authValidation from '@validations/auth';
import { requestValidator } from '@middlewares/validation';
import { auth as authController } from '@controllers';

const route = Router();

route.post('/login', requestValidator(authValidation.login), authController.login);

export default route;
