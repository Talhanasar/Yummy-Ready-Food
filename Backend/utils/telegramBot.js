const TelegramBot = require('node-telegram-bot-api');
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: false });

// Function to send a message using the message bot
const sendTelegramMessage = (savedOrder, productsArray) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const products = productsArray.map(item => `${item.name} - Quantity: ${item.quantity}`).join('\n\t');
  const message = `New Order Received: \nName: ${savedOrder.customerName}\nPhone: ${savedOrder.phoneNumber}\nArea: ${savedOrder.area}\nLocation: ${savedOrder.location}\nSubtotal: ${savedOrder.subTotal}\nTotalPrice: ${savedOrder.totalPrice}\nProducts:\{\n  ${products}\n\}`;
  bot.sendMessage(chatId, message)
    .then(() => {
      console.log("Message sent successfully!");
    })
    .catch(error => {
      console.error("Error sending message: " + error.message);
    });
};

module.exports = {sendTelegramMessage };