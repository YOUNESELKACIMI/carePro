const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);


// const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.POSTGRES_PASSWORD,{
//     host: process.env.DB_HOST,
//     port:process.env.DB_PORT,
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
// });

module.exports = { sequelize };
