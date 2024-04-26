const {User} = require('../models/index')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


router.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(401).json({ error: 'invalid email' })
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCorrect) {
        return res.status(401).json({ error: 'invalid password' })
    }
    const userForToken = {
        email: user.email,
        id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET,{expiresIn: 60*60})
    res.status(200).send({ token, email: user.email, name: user.name })
})


module.exports = router