const {sequelize} = require('../config/db');
const {DataTypes, Model, BelongsTo} = require('sequelize');

class Doctor extends Model {}

Doctor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    locality: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'doctor'
});




module.exports = Doctor;