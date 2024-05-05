const router = require("express").Router();
const { sendMessage } = require("../controllers/chat");
const {tokenExtractor} = require("../middlewares/tokenExtractor");

router.post("/", tokenExtractor, sendMessage);

module.exports = router;
