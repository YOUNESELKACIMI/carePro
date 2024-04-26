const express = require('express');
require('dotenv').config();
require('express-async-errors')

const { sequelize } = require('./config/db');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const doctorsRouter = require('./controllers/doctors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/doctors', doctorsRouter);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true }); // Synchronize all models
    console.log('All models were synchronized successfully.');
});
