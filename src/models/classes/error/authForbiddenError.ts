import InternalError from './internalError';
import { httpStatusCode } from '@constants';

export default class AuthForbiddenError extends InternalError {
    httpCode: number;

    constructor(message: string) {
        super(message);

        this.httpCode = httpStatusCode.FORBIDDEN;
        Object.setPrototypeOf(this, AuthForbiddenError.prototype);
    }
}
