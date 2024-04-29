const express = require("express");
require("dotenv").config();
require("express-async-errors");

const { sequelize } = require("./config/db");
const { token } = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/login"));
app.use("/api/doctors", require("./routes/doctors"));

app.get(
  "/api",
  require("./middlewares/tokenExtractor").tokenExtractor,
  (req, res) => {
    const { password, ...other } = req.user;
    const payload = {
      user: other,
      token: req.access_token,
    };
    console.log("payload = ", payload);
    return res.json(payload);
  }
);
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await sequelize.authenticate();
  console.log("Database connected!");
  await sequelize.sync({ alter: true }); // Synchronize all models
  console.log("All models were synchronized successfully.");
});

