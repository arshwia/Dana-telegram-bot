import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { Configuration, OpenAIApi } from 'openai';

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  if (!userMessage) {
    bot.sendMessage(chatId, "ببخشید ما اینجا تکیست مهور هستیم. با تشکر");
    return;
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const botReply = response.data.choices[0].message.content;
    bot.sendMessage(chatId, botReply);

  } catch (error) {
    console.error("OpenAI error:", error);
    bot.sendMessage(chatId, "متاسفانه الان نمی‌تونم پاسخ بدم، بعدا دوباره امتحان کن.");
  }
});
