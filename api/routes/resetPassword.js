const router = require("express").Router()


router.get('/:token',require('../controllers/resetPassword'))

module.exports = router