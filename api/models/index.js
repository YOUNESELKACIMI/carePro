const User = require('./user');
const Doctor = require('./doctor');
const ChatHistory = require('./chatHistory')

User.belongsToMany(Doctor, {through: 'userDoctors'})
Doctor.belongsToMany(User, {through: 'userDoctors'})

User.hasMany(ChatHistory)
ChatHistory.belongsTo(User)


ChatHistory.sync({alter:true})
User.sync({alter: true})
Doctor.sync({alter: true})

module.exports = {User, Doctor,ChatHistory};