const User = require('./user');
const Doctor = require('./doctor');

User.belongsToMany(Doctor, {through: 'userDoctors'})
Doctor.belongsToMany(User, {through: 'userDoctors'})


User.sync({alter: true})
Doctor.sync({alter: true})

module.exports = {User, Doctor};