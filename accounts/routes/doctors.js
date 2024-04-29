const router = require("express").Router();

const {
  getDoctors,
  getDoctor,
  addDoctorToUser,
  registerDoctor,
  deleteDoctor
} = require("../controllers/doctors");
const {tokenExtractor} = require("../middlewares/tokenExtractor");

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.post("/", tokenExtractor, addDoctorToUser);
router.post("/register", registerDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
