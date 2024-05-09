const router = require("express").Router();

const {getUsers,getUser,registerUser,deleteUser, getMyProfile} = require("../controllers/users");
const {tokenExtractor} = require("../middlewares/tokenExtractor");
router.get("/",getUsers);
router.get("/me", tokenExtractor ,getMyProfile);
router.get("/:id",getUser);
router.post("/register",registerUser);
router.delete("/:id",deleteUser);

module.exports = router;