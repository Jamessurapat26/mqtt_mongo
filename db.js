var mongoose = require('mongoose');

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/mqtt_messages"; // Change this to your MongoDB URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        ensureCollectionExists();
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Define a schema for storing MQTT messages
const messageSchema = new mongoose.Schema({
    topic: String,
    message: Object,
    receivedAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Function to ensure the mqtt_messages collection exists
function ensureCollectionExists() {
    mongoose.connection.db.listCollections({ name: 'mqtt_messages' })
        .next(function (err, collinfo) {
            if (!collinfo) {
                console.log("Creating mqtt_messages collection...");

                // Creating the collection by inserting a dummy document and deleting it
                const dummyMessage = new Message({
                    topic: 'dummy',
                    message: {},
                    receivedAt: new Date()
                });

                dummyMessage.save()
                    .then(() => Message.deleteOne({ topic: 'dummy' }))
                    .then(() => console.log("mqtt_messages collection created"))
                    .catch(err => console.error("Error creating mqtt_messages collection:", err));
            } else {
                console.log("mqtt_messages collection already exists");
            }
        });
}

module.exports = Message;
