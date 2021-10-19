// Don't touch this 
require('dotenv').config()
const { Telegraf, Markup } = require('telegraf')
//bot.use(Telegraf.log())


const bot = new Telegraf(process.env.BOT_TOKEN); 

// Base command 
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name} !`))
bot.on('voice', (ctx) => ctx.reply('у тебя чудесный голос'))
bot.help((ctx) => ctx.reply('Мне тоже нужна помощь',)) 
bot.hears('привет', (ctx) => ctx.reply('ну здарова'))
bot.hears('жопа', (ctx) => ctx.reply('соси жопу'))



bot.command('onetime', (ctx) =>
  ctx.reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize() 
  )
)

bot.command('custom', async (ctx) => {
    return await ctx.reply('Custom buttons keyboard', Markup.keyboard([
        ['Выплата', '😎 Жопа']
      ])
      .oneTime()
      .resize()
    )
  })



bot.launch() 

// async - ассинхронная функция 