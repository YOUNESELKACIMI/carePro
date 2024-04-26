const {User,Doctor} = require('../models/index')
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Doctor,
      attributes: ['id', 'name', 'email', 'phoneNumber', 'locality'],
      through: { attributes: [] }, // To exclude the join table attributes
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id,{
    include: {
      model: Doctor,
      attributes: ['id', 'name', 'email', 'phoneNumber', 'locality'],
      through: { attributes: [] }, // To exclude the join table attributes
    },
  })
  res.json(user)
})

router.post('/register', async (req, res) => {
  const user = req.body
  const passwordHash = await bcrypt.hash(user.password, 10)
  user.passwordHash = passwordHash
  delete user.password
  const newUser = await User.create(user)
  res.json(newUser)
})



router.delete('/:id', async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json({message: 'User deleted successfully'})
})



module.exports = router
