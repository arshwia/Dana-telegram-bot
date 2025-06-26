import 'dotenv/config';
import TelegramBot from "node-telegram-bot-api";

const tokenTelegramBot = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(tokenTelegramBot, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'سلام! من Dana Telegram Bot هستم 🤖');
});