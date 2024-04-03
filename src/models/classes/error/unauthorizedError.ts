import InternalError from './internalError';
import { httpStatusCode } from '@constants';

export default class UnauthorizedError extends InternalError {
    httpCode: number;

    constructor(message: string) {
        super(message);

        this.httpCode = httpStatusCode.UNAUTHORIZED;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
