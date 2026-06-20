const express = require("express");
const router = express.Router();

const tableController = require("../controllers/tableController");

router.get("/data", tableController.getData);

router.put("/data/:id", tableController.updateRow);

router.delete("/data/:id", tableController.deleteRow);

module.exports = router;