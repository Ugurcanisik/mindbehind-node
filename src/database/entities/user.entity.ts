import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    AutoIncrement,
    BeforeCreate,
    HasOne,
    Unique, AllowNull
} from 'sequelize-typescript';
import { date as dateHelper, common as commonHelper } from '@helpers';
import { UserRole } from './';

@Table({
    tableName: 'User',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    userNumber: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    userName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    roleNumber: string;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    updatedAt: Date;

    @BeforeCreate
    static async hashPassword(instance: User) {
        if (instance.password) {
            instance.password = commonHelper.generateHashForPassword(instance.password);
        }
    }

    public async comparePasswords(candidatePassword: string, hashedPassword: string) {
        return commonHelper.checkHash(candidatePassword, hashedPassword);
    }

    @HasOne(() => UserRole, {
        sourceKey: 'roleNumber',
        constraints: false
    })
    role?: UserRole;
}
