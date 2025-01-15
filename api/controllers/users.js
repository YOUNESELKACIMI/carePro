const { User, Doctor, ChatHistory } = require("../models/index");
const bcrypt = require("bcrypt");
const { get } = require("../routes/doctors");

const getUsers = async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Doctor,
        attributes: ["id", "name", "place_id", "locality"],
        through: { attributes: [] }, // To exclude the join table attributes
      },
      {
        model: ChatHistory,
        attributes: ["role", "content", "id"],
      },
    ],
    attributes: {
      exclude: ["passwordHash", "resetPasswordToken", "resetPasswordExpires"],
    },
  });
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Doctor,
        attributes: ["id", "name", "place_id", "locality"],
        through: { attributes: [] }, // To exclude the join table attributes
      },
      {
        model: ChatHistory,
        attributes: ["role", "content", "id"],
      },
    ],
    attributes: {
      exclude: ["passwordHash", "resetPasswordToken", "resetPasswordExpires"],
    },
  });
  res.json(user);
};

const getMyProfile = async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id, {
    include: [
      {
        model: Doctor,
        attributes: ["id", "name", "place_id", "locality"],
        through: { attributes: [] }, // To exclude the join table attributes
      },
      {
        model: ChatHistory,
        attributes: ["role", "content", "id"],
      },
    ],
    attributes: {
      exclude: ["passwordHash", "resetPasswordToken", "resetPasswordExpires"],
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
  getMyProfile,
};
