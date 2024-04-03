import { JWT as jwtHelper } from '@helpers';
import { httpStatusCode } from '@constants';
import { IUserTokenPayload } from '@models/interfaces';
import { Request, Response, NextFunction } from 'express';
import { BaseResponse, UnauthorizedError, NotFoundError, InternalError, AuthForbiddenError } from '@models/classes';
import { branch as branchService } from '@services';

const jwtAuth = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = (req.headers?.authorization || req.headers?.Authorization) as string;
        if (!bearer) {
            throw new UnauthorizedError("Token is not found in request's headers!");
        }
        const token = bearer.replace('Bearer ', '');
        const verifyResult = jwtHelper.verify<IUserTokenPayload>(token);

        if (!verifyResult) {
            throw new UnauthorizedError('Token is not valid!');
        }
        req.user = verifyResult;
        next();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.UNAUTHORIZED).json(BaseResponse.createDefaultError());
    }
};

const jwtAuthWithPermission = (permission: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = (req.headers?.authorization || req.headers?.Authorization) as string;
        if (!bearer) {
            throw new UnauthorizedError("Token is not found in request's headers!");
        }
        const token = bearer.replace('Bearer ', '');
        const verifyResult = jwtHelper.verify<IUserTokenPayload>(token);

        if (!verifyResult) {
            throw new UnauthorizedError('Token is not valid!');
        }

        if (verifyResult.role !== permission) {
            throw new UnauthorizedError('You do not have permission to access this resource!');
        }

        req.user = verifyResult;
        next();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.UNAUTHORIZED).json(BaseResponse.createDefaultError());
    }
};

const checkBranch = () => async (req: Request, res: Response, next: NextFunction) => {
    const { userNumber } = req.user!;
    const { branchNumber } = req.params;

    try {
        if (!branchNumber) {
            throw new NotFoundError('branchNumber is not found');
        }

        const branch = await branchService.getBranchByBranchNumberWithUser(branchNumber);

        if (!branch.branchUserMap!.find((user) => user.userNumber === userNumber)) {
            throw new AuthForbiddenError('This branch is not yours');
        }

        req.branch = branch;
        next();
    } catch (error) {
        if (error instanceof InternalError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.createDefaultError());
    }
};

export { jwtAuth, jwtAuthWithPermission, checkBranch };
