const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');


class User extends Model {}

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize,
    underscored: true,
    timestamps:false,
    modelName: 'user'
})



module.exports = User;
