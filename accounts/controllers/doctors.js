const {Doctor,User} = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const router = require('express').Router();

const tokenExtractor = async (req,res,next) =>{
    const authorization = req.get('Authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        console.log("authorization = ", authorization.substring(7))
        try{
            req.decodedToken = jwt.verify(authorization.substring(7),process.env.SECRET)
        } catch(err){
            return res.status(401).json({error:'invalid token'})
        }
    }
    else {
        return res.status(401).json({error:'missing token'})
    }
    next()
}


router.get('/', async (req, res) => {
    const doctors = await Doctor.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'email'],
            through: { attributes: [] }, // To exclude the join table attributes
        },
    })
    res.json(doctors)
})

router.get('/:id', async (req, res) => {
    const doctor = await Doctor.findByPk(req.params.id,{
        include: {
            model: User,
            attributes: ['id', 'name', 'email'],
            through: { attributes: [] }, // To exclude the join table attributes
        },
    })
    res.json(doctor)
})


router.post('/', tokenExtractor , async (req, res) => {
    const userId = req.decodedToken.id
    const user = await User.findByPk(userId)
    if(!user){
        return res.status(401).json({error:'token missing or invalid'})
    }
    const doctor = req.body
    const foundDoctor = await Doctor.findOne({
        where: {
            email: doctor.email
        }
    })

    //if the doctor already exists, dont create a new one just save it to the user
    if(foundDoctor){
        await user.addDoctor(foundDoctor)
        return res.json(foundDoctor)
    }
    
})


router.post('/register', async (req, res) => {
    const doctor = req.body
    const newDoctor = await Doctor.create(doctor)
    res.json(newDoctor)
})

/*
router.post('/', async (req, res) => {
    const doctor = req.body
    const newDoctor = await Doctor.create(doctor)
    res.json(newDoctor)
})
*/


router.delete('/:id', async (req, res) => {
    await Doctor.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'Doctor deleted successfully'})
})

module.exports = router