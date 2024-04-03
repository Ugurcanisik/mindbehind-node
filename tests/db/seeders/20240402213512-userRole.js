module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'UserRole',
            [
                {
                    id: 1,
                    roleNumber: 'RL-112233441',
                    name: 'OWNER'
                },
                {
                    id: 2,
                    roleNumber: 'RL-112233442',
                    name: 'EMPLOYEE'
                },
                {
                    id: 3,
                    roleNumber: 'RL-112233443',
                    name: 'CUSTOMER'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserRole', null, {});
    }
};
