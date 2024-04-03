module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'Branch',
            [
                {
                    id: 1,
                    branchNumber: 'BRC-112233441',
                    latitude: 39.903785,
                    longitude: 32.873865,
                    name: 'TEST-1',
                    fullAddress: 'TEST-1',
                    phone: '1234567890',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                },
                {
                    id: 2,
                    branchNumber: 'BRC-112233442',
                    latitude: 39.903785,
                    longitude: 32.873865,
                    name: 'TEST-2',
                    fullAddress: 'TEST-2',
                    phone: '1234567890',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                },
                {
                    id: 3,
                    branchNumber: 'BRC-112233443',
                    latitude: 39.903785,
                    longitude: 32.873865,
                    name: 'TEST-3',
                    fullAddress: 'TEST-3',
                    phone: '1234567890',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                },
                {
                    id: 4,
                    branchNumber: 'BRC-112233444',
                    latitude: 39.903785,
                    longitude: 32.873865,
                    name: 'TEST-4',
                    fullAddress: 'TEST-4',
                    phone: '1234567890',
                    createdAt: '2024-04-03 02:27:51',
                    updatedAt: '2024-04-03 02:27:51'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Branch', null, {});
    }
};
