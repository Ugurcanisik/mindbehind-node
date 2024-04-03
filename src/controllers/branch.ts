import { matchedData } from 'express-validator';
import { plainToClass } from 'class-transformer';
import { httpStatusCode } from '@constants';
import { Response, Request } from 'express';
import { branch as branchService } from '@services';
import { BaseResponse, InternalError, UpdateBranchDTO } from '@models/classes';
import { Logger } from '@helpers';

const getBranches = async (req: Request, res: Response) => {
    const { userNumber } = req.user!;
    try {
        const branches = await branchService.getBranches(userNumber);

        return res.status(httpStatusCode.OK).json(
            new BaseResponse({
                data: { branches }
            })
        );
    } catch (error) {
        Logger.error('Get Branches Error', { error, userNumber });
        if (error instanceof InternalError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const getBranch = async (req: Request, res: Response) => {
    const { branchNumber } = matchedData(req, { locations: ['params'] });

    try {
        const branch = await branchService.getBranch(branchNumber);

        return res.status(httpStatusCode.OK).json(
            new BaseResponse({
                data: { branch }
            })
        );
    } catch (error) {
        Logger.error('Get Branch Error', { error, branchNumber });
        if (error instanceof InternalError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

const updateBranch = async (req: Request, res: Response) => {
    const reqData = plainToClass(UpdateBranchDTO, matchedData(req, { locations: ['params', 'body'] }));
    try {
        await branchService.updateBranch(reqData);

        return res.status(httpStatusCode.OK).json(new BaseResponse({}));
    } catch (error) {
        Logger.error('Update Branch Error', { error, reqData });
        if (error instanceof InternalError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

export { getBranches, getBranch, updateBranch };
