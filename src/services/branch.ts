import { branch as branchRepository } from '@repositories';
import { BranchDetail, NotFoundError, UpdateBranchDTO } from '@models/classes';
import { IBranch } from '@models/interfaces';

const getBranches = async (userNumber: string) => {
    const branches = await branchRepository.getBranches(userNumber);

    return branches.map((branch) => fillBranchDetailResponse(branch));
};

const getBranch = async (branchNumber: string) => {
    const branch = await branchRepository.getBranch(branchNumber);

    if (!branch) {
        throw new NotFoundError('Branch not found!');
    }

    return fillBranchDetailResponse(branch);
};

const getBranchByBranchNumberWithUser = async (branchNumber: string) => {
    const branch = await branchRepository.getBranchByBranchNumberWithUser(branchNumber);

    if (!branch) {
        throw new NotFoundError('Branch not found!');
    }

    return branch;
};

const updateBranch = async (data: UpdateBranchDTO) => {
    const findBranch = await branchRepository.getBranch(data.getBranchNumber());

    if (!findBranch) {
        throw new NotFoundError('Branch not found!');
    }

    await branchRepository.updateBranch(data);
};

const fillBranchDetailResponse = (branch: IBranch) => {
    const branchDetail = new BranchDetail();

    branchDetail.branchNumber = branch.branchNumber;
    branchDetail.latitude = branch.latitude;
    branchDetail.longitude = branch.longitude;
    branchDetail.name = branch.name;
    branchDetail.fullAddress = branch.fullAddress;
    branchDetail.phone = branch.phone;

    return branchDetail;
};

export { getBranches, getBranch, getBranchByBranchNumberWithUser, updateBranch };
