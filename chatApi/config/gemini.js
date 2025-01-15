const { GoogleGenerativeAI} = require("@google/generative-ai");
require("dotenv").config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({model : "gemini-1.5-flash"});

module.exports = model;
