class UpdateBranchDTO {
    private branchNumber: string;
    private latitude: number;
    private longitude: number;
    private name: string;
    private fullAddress: string;
    private phone: string;

    prepareUpdate() {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
            fullAddress: this.fullAddress,
            phone: this.phone
        };
    }

    getBranchNumber() {
        return this.branchNumber;
    }
}

export default UpdateBranchDTO;
