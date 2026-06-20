const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const tableRoutes = require("./routes/tableRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/table", tableRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});