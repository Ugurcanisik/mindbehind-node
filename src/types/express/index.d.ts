import { IUserTokenPayload, IBranch } from '../../models/interfaces';

declare global {
    namespace Express {
        interface Request {
            user?: IUserTokenPayload;
            branch?: IBranch;
        }
    }
}
