const router = require("express").Router();

const {getUsers,getUser,registerUser,deleteUser} = require("../controllers/users");

router.get("/",getUsers);
router.get("/:id",getUser);
router.post("/register",registerUser);
router.delete("/:id",deleteUser);

module.exports = router;