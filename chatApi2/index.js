const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/chat", require("./routes/chat"));

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
});
