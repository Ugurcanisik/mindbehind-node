import { LoginDTO } from '@models/classes';
import { matchedData } from 'express-validator';
import { plainToClass } from 'class-transformer';
import { httpStatusCode } from '@constants';
import { Response, Request } from 'express';
import { auth as authService } from '@services';
import { BaseResponse, InternalError } from '@models/classes';
import { Logger } from '@helpers';

const login = async (req: Request, res: Response) => {
    const reqData = plainToClass(LoginDTO, matchedData(req, { locations: ['body'] }));

    try {
        const user = await authService.login(reqData);

        return res.status(httpStatusCode.OK).json(
            new BaseResponse({
                data: { user }
            })
        );
    } catch (error) {
        Logger.error('Login error', { error, reqData });
        if (error instanceof InternalError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

export { login };
