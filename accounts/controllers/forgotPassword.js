const crypto = require("crypto");
const nodemailer = require("nodemailer")
const User = require('../models/user');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'weston.kirlin73@ethereal.email',
        pass: '5VetXf5vURBCrdQpcn'
    }
});



const forgotPassowrd = async (req,res) =>{

    const {email} = req.body

    const user = await User.findOne({
        where:{
            email:email
        }
    }) 

    if(!user){
        res.status(404).json({error:"user not found for this email"})
    }

    const token = crypto.randomBytes(20).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000

    await user.save()

    const resetUrl = `http:/localhost:3000/reset-password/${token}`

    await transporter.sendMail({
        to:email,
        subject:"reset password",
        html:`You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>
        Please click on the following link, or paste this into your browser to complete the process:<br>
        <a href="${resetUrl}">${resetUrl}</a><br>
        If you did not request this, please ignore this email and your password will remain unchanged.<br>`
    })

    res.json({message:"reset mail sent to your email"})
};



module.exports = forgotPassowrd