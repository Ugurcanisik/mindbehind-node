module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'User',
            [
                {
                    id: 1,
                    userNumber: 'USR-112233441',
                    name: 'USR-TEST-1',
                    userName: 'USR-TEST-1',
                    password: '$2a$12$6IBT6nBXAvmuec.RZ41lFuo8b0q3eLtoWP6i8xw33xaEVO7ffsMZ6',
                    roleNumber: 'RL-112233441',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                },
                {
                    id: 2,
                    userNumber: 'USR-112233442',
                    name: 'USR-TEST-2',
                    userName: 'USR-TEST-2',
                    password: '$2a$12$6IBT6nBXAvmuec.RZ41lFuo8b0q3eLtoWP6i8xw33xaEVO7ffsMZ6',
                    roleNumber: 'RL-112233442',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                },
                {
                    id: 3,
                    userNumber: 'USR-112233443',
                    name: 'USR-TEST-3',
                    userName: 'USR-TEST-3',
                    password: '$2a$12$6IBT6nBXAvmuec.RZ41lFuo8b0q3eLtoWP6i8xw33xaEVO7ffsMZ6',
                    roleNumber: 'RL-112233443',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('User', null, {});
    }
};
