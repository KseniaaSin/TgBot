require('dotenv').config()
const { Markup, Telegraf, Scenes: { WizardScene, Stage}, session } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('keyboard', (ctx) => {
    return ctx.reply('custom keyboard', Markup.keyboard([
        ['Выплата']
    ])
    .resize()
    )
})


//2
const nameHandler = Telegraf.on('text', async ctx => {
    ctx.scene.state.userId = ctx.message.chat.id
    ctx.scene.state.name = ctx.message.text
    await ctx.reply('Сколько?')    
    return ctx.wizard.next()
});

//3
const sumHandler = Telegraf.hears(/^[0-9]+$/, async ctx => {
    ctx.scene.state.sum = ctx.message.text;
    await ctx.reply('Каким способом произвести оплату?', Markup.inlineKeyboard ([
            Markup.button.callback('Безналичные', 'btn_1'), 
            Markup.button.callback('Наличные', 'btn_2' )
        ])
    )
    return ctx.wizard.next()
})


const ggHandler = Telegraf.on('text', async ctx => {
    ctx.session.name = ctx.scene.state.name
    ctx.session.id = ctx.scene.state.userId
    ctx.session.sum = ctx.scene.state.sum
    ctx.session.gg = ctx.message.text
    await ctx.reply('Отлично!');
    return ctx.scene.leave();
})

//1
const infoScene = new WizardScene('infoScene', nameHandler, sumHandler, ggHandler);

infoScene.enter(ctx => ctx.reply('Кому?'));

const stage = new Stage([ infoScene ]);
stage.hears('exit', ctx => ctx.scene.leave());


bot.use(session(), stage.middleware());
bot.command('/stop', ctx => ctx.replyWithHTML(
    `<b>Author:</b> ${ctx.session.id}
    <b>Recipient:</b> ${ctx.session.name}
    <b>Value:</b> ${ctx.session.sum}
    <b>Payment type:</b> ${ctx.session.gg}`
));
bot.hears('Выплата', ctx => ctx.scene.enter('infoScene'));


bot.launch();

