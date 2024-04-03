module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'BranchUserMap',
            [
                {
                    id: 1,
                    userNumber: 'USR-112233441',
                    branchNumber: 'BRC-112233441'
                },
                {
                    id: 2,
                    userNumber: 'USR-112233442',
                    branchNumber: 'BRC-112233442'
                },
                {
                    id: 3,
                    userNumber: 'USR-112233443',
                    branchNumber: 'BRC-112233443'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('BranchUserMap', null, {});
    }
};
