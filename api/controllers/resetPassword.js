const User = require('../models/user');
const bcrypt = require('bcrypt')


const resetPassword = async (req,res) =>{

    const {token} = req.params
    const {newpassword} = req.body


    const user = await User.findOne({ 
        where: { 
          resetPasswordToken: token,
        }
      })
  

    if(!user){
        return res.status(400).json({message:"invalid token"})
    }

    else if (user.resetPasswordExpires<Date.now()) {
        res.stauts(400).json({message:"token expired"})
    }


    const newPasswordHash = await bcrypt.hash(newpassword,10)

    user.passwordHash = newPasswordHash
    user.resetPasswordToken = null
    user.resetPasswordExpires = null
    await user.save()


    res.json({message:"password reset successfully"})
}



module.exports = resetPassword 