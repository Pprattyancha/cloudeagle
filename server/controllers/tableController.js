const tableService = require("../services/tableService");

// GET DATA
const getData = (req, res) => {
  try {
    const { page = 0, limit = 50 } = req.query;

    const result = tableService.getTableData(
      Number(page),
      Number(limit)
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ROW
const updateRow = (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = tableService.updateRow(id, updatedData);

    res.json({
      message: "Row updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE ROW
const deleteRow = (req, res) => {
  try {
    const { id } = req.params;

    const result = tableService.deleteRow(id);

    res.json({
      message: "Row deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getData,
  updateRow,
  deleteRow,
};