const express = require("express");
require("dotenv").config();
require("express-async-errors");
const { consumeMessages } = require("./controllers/messagesConsumer");

const { sequelize } = require("./config/db");
const { token } = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/login"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/chat-history",require('./routes/chatHistories'))
app.use("/api/forgot-password",require("./routes/forgotPassword"))
app.use("/api/reset-password",require('./routes/resetPassword'))

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
  consumeMessages()
    .then(() => console.log("Message consumer started"))
    .catch((error) => console.error("Error starting message consumer:", error));
});
