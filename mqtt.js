// mqttClient.js
var mqtt = require('mqtt');

const MQTT_SERVER = "broker.emqx.io";
const MQTT_PORT = "1883";
const MQTT_USER = "";
const MQTT_PASSWORD = "";

// Connect to MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    console.log("Connected to MQTT broker");

    // Subscribe to the topic
    client.subscribe('testtopic/test', function (err) {
        if (err) {
            console.log("Subscription error:", err);
        }
    });
});

// Export the client
module.exports = client;
