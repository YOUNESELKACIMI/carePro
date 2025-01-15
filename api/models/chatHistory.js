const {sequelize} = require('../config/db')
const {Model,DataTypes} = require('sequelize')

class ChatHistory extends Model{}

ChatHistory.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},
{
    sequelize,
    underscored:true,
    timestamps:false,
    modelName:"chatHistory"
})

module.exports = ChatHistory