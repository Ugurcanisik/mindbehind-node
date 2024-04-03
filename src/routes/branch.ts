import { Router } from 'express';
import { requestValidator } from '@middlewares/validation';
import * as branchValidation from '@validations/branch';
import { user as userConstants } from '@constants';
import { branch as branchController } from '@controllers';
import {
    jwtAuth as jwtAuthMW,
    jwtAuthWithPermission as jwtAuthWithPermission,
    checkBranch as checkBranchMW
} from '@middlewares/auth';

const route = Router();

route.get('/', jwtAuthMW(), branchController.getBranches);

route.get(
    '/:branchNumber',
    jwtAuthMW(),
    checkBranchMW(),
    requestValidator(branchValidation.getBranch),
    branchController.getBranch
);

route.patch(
    '/:branchNumber',
    jwtAuthWithPermission(userConstants.role.owner),
    requestValidator(branchValidation.updateBranch),
    branchController.updateBranch
);

export default route;
