const { Telegraf, Markup } = require('telegraf');

// Твой проверенный токен и ссылка
const BOT_TOKEN = '8103229371:AAHcFdYWAPorx_e9EIGulaxHznboU3QlZQQ'; 
const WEB_APP_URL = 'https://stargazer8916-alt.github.io/webapp/'; 

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  const userName = ctx.from.first_name || 'Игрок';
  
  return ctx.reply(`Привет, ${userName}! Добро пожаловать в Underworld.`, Markup.inlineKeyboard([
    [Markup.button.webApp('🔥 ИГРАТЬ', WEB_APP_URL)]
  ]));
});

// Запуск
bot.launch()
  .then(() => console.log('✅ БОТ УСПЕШНО ЗАПУЩЕН'))
  .catch((err) => console.error('❌ ОШИБКА ЗАПУСКА:', err));

// Обработка критических ошибок, чтобы сервер не падал
process.on('uncaughtException', (err) => {
    console.error('Критическая ошибка Node.js:', err);
});
