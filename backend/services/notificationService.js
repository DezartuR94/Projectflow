const axios = require("axios");

const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5002";

async function sendNotification(title, message, type = "info") {
  try {
    const response = await axios.post(
      `${NOTIFICATION_SERVICE_URL}/notify`,
      {
        title,
        message,
        type,
      },
      {
        timeout: 3000,
      },
    );

    console.log("Notificación enviada:", response.data);
  } catch (error) {
    console.error(
      "No se pudo enviar la notificación:",
      error.response?.data || error.message,
    );
  }
}

module.exports = sendNotification;
