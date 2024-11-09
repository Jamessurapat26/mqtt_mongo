// app.js
const client = require('./mqtt');
const Message = require('./db');

// Receive Message and save it to MongoDB
client.on('message', function (topic, message) {
    try {
        // Parse the message content
        const messageContent = JSON.parse(message.toString());
        console.log("Received Message:", messageContent);

        // Create a new message document and save it to MongoDB
        const mqttMessage = new Message({
            topic: topic,
            message: messageContent
        });

        mqttMessage.save()
            .then(() => console.log("Message saved to MongoDB"))
            .catch(err => console.error("Error saving message to MongoDB:", err));

    } catch (err) {
        console.error("Error parsing message:", err);
    }
});
