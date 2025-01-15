const {ChatHistory,User} = require('../models/index')



const getChatHistory = async (req,res) =>{
    const chatHistory = await ChatHistory.findAll()
    res.json(chatHistory)
}

const saveChatHistory = async (req,res) =>{
    

    const user = await User.findByPk(req.decodedToken.id)
    
    if(!user){
        return res.status(404).json({message:"invalid or missing token"})
    }

    const chatHistory = req.body
    chatHistory.userId = req.decodedToken.id

    const savedChatHistory =  await ChatHistory.create(chatHistory)

    return res.json(savedChatHistory)
}


const clearChatHistory = async (req,res) =>{

    const user = await User.findByPk(req.decodedToken.id)
    if(!user){
        return res.status(404).json({message:"missing or invalid token"})
    }

    await ChatHistory.truncate()
    res.json({message:"chat history cleared"})

}

module.exports = {saveChatHistory,getChatHistory,clearChatHistory}