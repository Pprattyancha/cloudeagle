const generateTableData = (count = 10000) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i.toString(),
        name: `User ${i}`,
        email: `user${i}@test.com`,
        salary: Math.floor(Math.random() * 100000),
    }));
};

module.exports = generateTableData;