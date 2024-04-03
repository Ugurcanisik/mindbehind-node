import { MySQL } from '@database';

const getUserByUserName = async (userName: string) =>
    MySQL.entities.user.findOne({
        include: [
            {
                model: MySQL.entities.userRole,
                required: true
            }
        ],
        where: {
            userName
        }
    });

const createUser = async () =>
    MySQL.entities.user.create({
        userName: 'test',
        password: 'test',
        roleId: 1
    });

export { getUserByUserName, createUser };
