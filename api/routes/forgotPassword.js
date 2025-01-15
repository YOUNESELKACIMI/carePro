const router = require("express").Router()

router.post('/',require('../controllers/forgotPassword'));


module.exports = router