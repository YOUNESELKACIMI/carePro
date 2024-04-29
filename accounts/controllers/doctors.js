const { Doctor, User } = require("../models/index");


const getDoctors = async (req, res) => {
  const doctors = await Doctor.findAll({
    include: {
      model: User,
      attributes: ["id", "name", "email"],
      through: { attributes: [] }, // To exclude the join table attributes
    },
  });
  res.json(doctors);
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ["id", "name", "email"],
      through: { attributes: [] }, // To exclude the join table attributes
    },
  });
  res.json(doctor);
};

const addDoctorToUser = async (req, res) => {
  const userId = req.decodedToken.id;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const doctor = req.body;
  const foundDoctor = await Doctor.findOne({
    where: {
      email: doctor.email,
    },
  });

  //if the doctor already exists, dont create a new one just save it to the user
  if (foundDoctor) {
    await user.addDoctor(foundDoctor);
    return res.json(foundDoctor);
  }

  return res.status(400).json({ error: "Doctor not found" });
};

const registerDoctor = async (req, res) => {
  const doctor = req.body;
  const newDoctor = await Doctor.create(doctor);
  res.json(newDoctor);
};

/*
router.post('/', async (req, res) => {
    const doctor = req.body
    const newDoctor = await Doctor.create(doctor)
    res.json(newDoctor)
})
*/

const deleteDoctor = async (req, res) => {
  await Doctor.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({ message: "Doctor deleted successfully" });
};

module.exports = {
  getDoctors,
  getDoctor,
  addDoctorToUser,
  registerDoctor,
  deleteDoctor
};
