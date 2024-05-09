const route = require("express").Router()
const {tokenExtractor} = require('../middlewares/tokenExtractor')

const {saveChatHistory,getChatHistory,clearChatHistory} = require('../controllers/chatHistories')

route.post('/',tokenExtractor,saveChatHistory)
route.get('/',getChatHistory)
route.delete('/',tokenExtractor,clearChatHistory)

module.exports = route