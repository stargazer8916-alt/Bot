const { Telegraf, Markup } = require('telegraf');

// === КОНФИГУРАЦИЯ ===
const BOT_TOKEN = '8221446561:AAFFCs1LWYFfxsccbq5QpUCLrDPtDX8uaEY'; // Твой новый токен
const WEB_APP_URL = 'https://stargazer8916-alt.github.io/webapp/'; 

const bot = new Telegraf(BOT_TOKEN);

// === ОБРАБОТКА КОМАНД ===
bot.start(async (ctx) => {
    try {
        const userName = ctx.from.first_name || 'Странник';
        
        // Атмосферный и привлекательный текст в формате HTML
        const welcomeText = `
Приветствую, <b>${userName}</b>! 🌑

Добро пожаловать в <b>Underworld</b> — место, где рождаются легенды и куются лучшие игроки. Готов ли ты погрузиться в неоновую бездну и забрать свое?

<i>Твой путь начинается прямо сейчас. Жми на кнопку ниже, чтобы войти в игру!</i> 👇
`;

        // Отправляем сообщение с parse_mode: 'HTML'
        await ctx.reply(welcomeText, {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp('🔥 ВОЙТИ В UNDERWORLD', WEB_APP_URL)]
            ])
        });
    } catch (error) {
        console.error('❌ Ошибка при обработке команды /start:', error);
    }
});

// === ЗАПУСК БОТА ===
bot.launch()
    .then(() => console.log('✅ [Система] Бот успешно запущен и готов к работе!'))
    .catch((err) => console.error('❌ [Ошибка] Сбой при запуске бота:', err));

// === ЗАЩИТА И ПРАВИЛЬНАЯ ОСТАНОВКА ===
// Обработка критических ошибок, чтобы сервер не падал
process.on('uncaughtException', (err) => {
    console.error('🔥 [Критическая ошибка Node.js] Неперехваченное исключение:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ [Внимание] Необработанное отклонение Promise:', promise, 'причина:', reason);
});

// Изящная остановка (Graceful shutdown)
process.once('SIGINT', () => {
    console.log('🛑 Остановка бота (SIGINT)...');
    bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
    console.log('🛑 Остановка бота (SIGTERM)...');
    bot.stop('SIGTERM');
});
