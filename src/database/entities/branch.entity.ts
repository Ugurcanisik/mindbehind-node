import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    Unique, AllowNull
} from 'sequelize-typescript';
import { date as dateHelper } from '@helpers';
import { BranchUserMap } from './branchUserMap.entity';

@Table({
    tableName: 'Branch',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})
export class Branch extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    branchNumber: string;

    @AllowNull(false)
    @Column(DataType.FLOAT(18, 9))
    latitude: number;

    @AllowNull(false)
    @Column(DataType.FLOAT(18, 9))
    longitude: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    fullAddress: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    updatedAt: Date;

    @HasMany(() => BranchUserMap, {
        foreignKey: 'branchNumber',
        sourceKey: 'branchNumber',
        constraints: false
    })
    branchUserMap?: BranchUserMap[];
}
