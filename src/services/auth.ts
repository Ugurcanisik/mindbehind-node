import { JWT as jwtHelper } from '@helpers';
import { user as userRepository } from '@repositories';
import { LoginDTO, UnauthorizedError } from '@models/classes';
import { IUser } from '@models/interfaces';

const login = async (data: LoginDTO) => {
    const user = await checkUserForLogin(data);

    return generateToken(user);
};

const checkUserForLogin = async (data: LoginDTO) => {
    const user = await userRepository.getUserByUserName(data.userName);

    if (!user) {
        throw new UnauthorizedError('Username or password is wrong.');
    }

    const passwordCheck = await user.comparePasswords(data.password, user.password);

    if (!passwordCheck) {
        throw new UnauthorizedError('Username or password is wrong.');
    }

    return user;
};

const generateToken = (user: IUser) => {
    const tokenPayload = {
        userNumber: user.userNumber,
        userName: user.userName,
        role: user.role!.name
    };

    return {
        userNumber: user.userNumber,
        userName: user.userName,
        role: user.role!.name,
        token: jwtHelper.sign(tokenPayload, {})
    };
};

export { login };
