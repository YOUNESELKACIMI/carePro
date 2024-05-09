const amqp = require("amqplib");

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    return connection.createChannel();
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};

module.exports = { connectRabbitMQ };
