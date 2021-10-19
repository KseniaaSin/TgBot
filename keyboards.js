// import Markup from 'telegraf/markup.js'

// export function getMainMenu() {
//     return Markup.keyboard([
//         ['Выплата', 'Жопа, а не выплата']
//     ]).resize().extra()
// }

function keyboard(){
    bot.command('onetime', (ctx) =>
  ctx.reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize() //чтобы кнопки были удобного размера
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
  return
}