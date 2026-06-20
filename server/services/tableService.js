const { tableData } = require("../data/tableData");

// GET PAGINATED DATA
const getTableData = (page, limit) => {
  const start = page * limit;
  const end = start + Number(limit);

  return {
    total: tableData.length,
    rows: tableData.slice(start, end),
  };
};

// UPDATE ROW
const updateRow = (id, updatedData) => {
  const index = tableData.findIndex((row) => row.id === id);

  if (index === -1) {
    throw new Error("Row not found");
  }

  tableData[index] = {
    ...tableData[index],
    ...updatedData,
  };

  return tableData[index];
};

// DELETE ROW
const deleteRow = (id) => {
  const index = tableData.findIndex((row) => row.id === id);

  if (index === -1) {
    throw new Error("Row not found");
  }

  const deleted = tableData.splice(index, 1);
  return deleted[0];
};

module.exports = {
  getTableData,
  updateRow,
  deleteRow,
};