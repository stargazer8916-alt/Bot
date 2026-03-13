const { Telegraf, Markup } = require('telegraf');

// Токен от BotFather
const BOT_TOKEN = '8103229371:AAHcFdYWAPorx_e9EIGulaxHznboU3QlZQQ';
// Ссылка на твой развернутый HTML (интерфейс, который мы сделали раньше)
const WEB_APP_URL = 'https://stargazer8916-alt.github.io/webapp/';

const bot = new Telegraf(BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
    const userName = ctx.from.first_name || 'Dealer';

    return ctx.replyWithMarkdownV2(
        `*ДОБРО ПОЖАЛОВАТЬ В UNDERWORLD, ${userName.toUpperCase()}* ⚡\n\n` +
        `Здесь ты — хозяин рынка\\. Торгуй редкими скинами, открывай кейсы и доминируй\\>
        Markup.inlineKeyboard([
            [Markup.button.webApp('🔥 ВОЙТИ В ИГРУ', WEB_APP_URL)],
            [Markup.button.url('📢 КАНАЛ СООБЩЕСТВА', 'https://t.me/your_channel')]
        ])
    );
});

// Пример обработки данных из Web App (если решишь отправлять данные из HTML в бот)
bot.on('web_app_data', async (ctx) => {
    const data = JSON.parse(ctx.webAppData.data().text);

    if (data.action === 'purchase') {
        await ctx.reply(`✅ Покупка подтверждена: ${data.itemName} за ${data.price} G`);
    }
});

// Запуск бота
bot.launch().then(() => {
    console.log('--- Бот успешно запущен в Neon-режиме ---');
});

// Мягкая остановка
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
