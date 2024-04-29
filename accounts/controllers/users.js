const { User, Doctor } = require("../models/index");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Doctor,
      attributes: ["id", "name", "email", "phoneNumber", "locality"],
      through: { attributes: [] }, // To exclude the join table attributes
    },
  });
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Doctor,
      attributes: ["id", "name", "email", "phoneNumber", "locality"],
      through: { attributes: [] }, // To exclude the join table attributes
    },
  });
  res.json(user);
};

const registerUser = async (req, res) => {
  const user = req.body;
  const passwordHash = await bcrypt.hash(user.password, 10);
  user.passwordHash = passwordHash;
  delete user.password;
  const newUser = await User.create(user);
  res.json(newUser);
};

const deleteUser = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
};
