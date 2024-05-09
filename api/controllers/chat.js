const systemPrompt = `
Limit your responses strictly to the healthcare domain.
I require information, guidance, and support exclusively
related to medical conditions, symptoms, diagnoses, treatments,
medications, healthcare procedures, preventive measures,
and general health inquiries. Do not deviate from these topics
or provide responses on unrelated subjects such as entertainment,
personal opinions, or any content that falls outside the scope of
healthcare. Additionally, ensure that all information provided adheres
to medical ethics, privacy regulations, and professional standards.
Always give bullet points as an answer.
Never skip a question.
Always answer.
Thank you for your compliance.
`;
const messagesHistory = [{ role: "system", content: systemPrompt }];
const openai = require("../config/open-ai.js");
const { connectRabbitMQ } = require("../config/rabbitmq.js");

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
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messagesHistory,
    });

    const completionText = completion.choices[0].message.content;
    console.log(`YOU : ${message}`);
    console.log(`CHAT : ${completionText}`);

    messagesHistory.push({ role: "assistant", content: completionText });
    await channel.assertQueue("messages");
    await channel.sendToQueue(
      "messages",
      Buffer.from(
        JSON.stringify({
          role: "assistant",
          content: completionText,
          id: user.id,
        })
      )
    );
    return res.status(200).json({ message: completionText });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage };
