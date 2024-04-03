import { MySQL } from '@database';
import { UpdateBranchDTO } from '@models/classes';

const getBranches = async (userNumber: string) =>
    MySQL.entities.branch.findAll({
        include: [
            {
                model: MySQL.entities.branchUserMap,
                where: {
                    userNumber
                }
            }
        ]
    });

const getBranch = async (branchNumber: string) =>
    MySQL.entities.branch.findOne({
        where: {
            branchNumber: branchNumber
        }
    });

const getBranchByBranchNumberWithUser = async (branchNumber: string) =>
    MySQL.entities.branch.findOne({
        include: [
            {
                model: MySQL.entities.branchUserMap,
                required: true
            }
        ],
        where: {
            branchNumber: branchNumber
        }
    });

const updateBranch = async (data: UpdateBranchDTO) =>
    MySQL.entities.branch.update(data.prepareUpdate(), { where: { branchNumber: data.getBranchNumber() } });

export { getBranches, getBranch, getBranchByBranchNumberWithUser, updateBranch };
