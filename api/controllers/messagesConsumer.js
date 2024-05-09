const { connectRabbitMQ } = require("../config/rabbitmq.js");
const { ChatHistory, User } = require("../models/index");

const consumeMessages = async () => {
  const channel = await connectRabbitMQ();
  channel.assertQueue("messages");
  channel.consume("messages", async (message) => {
    if (message !== null) {
      try {
        const content = JSON.parse(message.content.toString());
        console.log("##########################################FROM BROKER : ", content);
        // const user = await User.findByPk(content.id);
        // if (!user) {
        //   console.error("User not found");
        //   throw new Error("User not found");
        // }
        await ChatHistory.create({
          userId: content.id,
          role: content.role,
          content: content.content,
        });
        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        channel.nack(message);
      }
    }
  });
};

module.exports = { consumeMessages };
