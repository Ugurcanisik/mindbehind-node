import {Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, AllowNull} from 'sequelize-typescript';
import { Branch } from './';

@Table({
    tableName: 'BranchUserMap',
    timestamps: false
})
export class BranchUserMap extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    userNumber: string;

    @ForeignKey(() => Branch)
    @AllowNull(false)
    @Column(DataType.STRING)
    branchNumber: string;
}
