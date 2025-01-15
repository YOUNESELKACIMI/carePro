const { connectRabbitMQ } = require("../config/rabbitmq.js");

const messagesHistory = [];
const sendMessage = async (req, res) => {
  const { message } = req.body;
  const user = req.decodedToken;
  const channel = await connectRabbitMQ();
  await channel.assertQueue("messages");
  await channel.sendToQueue(
    "messages",
    Buffer.from(JSON.stringify({ role: "user", content: message, id: user.id }))
  );
  try {
    messagesHistory.push({ role: "user", content: message });
    const response =  await fetch("http://carepro-chatbot:9999/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const carepro_response = await response.json();
    console.log(`YOU : ${message}`);
    console.log(`CHAT : ${carepro_response.response}`);

    messagesHistory.push({ role: "assistant", content: carepro_response.response });
    await channel.assertQueue("messages");
    await channel.sendToQueue(
      "messages",
      Buffer.from(
        JSON.stringify({
          role: "assistant",
          content: carepro_response.response,
          id: user.id,
        })
      )
    );
    return res.status(200).json({ message: carepro_response.response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage };
