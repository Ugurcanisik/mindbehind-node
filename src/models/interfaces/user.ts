import IUserRole from './userRole';

interface IUser {
    id: number;
    userNumber: string;
    roleNumber: string;
    name: string;
    userName: string;
    role?: IUserRole;
}

export default IUser;
