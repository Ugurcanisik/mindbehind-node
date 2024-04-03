import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    Unique,
    AllowNull
} from 'sequelize-typescript';
import { user as userConstants } from '@constants';
import { User } from './';

@Table({
    tableName: 'UserRole',
    timestamps: false
})
export class UserRole extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.STRING)
    roleNumber: string;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(userConstants.role)))
    name: string;
}
