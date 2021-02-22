const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const escapeHtml = s => s
  .replace(/</g, '&lt;');

function buildName(user) {
  let name = `<b>${escapeHtml(user.first_name)}</b>`
  if (user.last_name) name += ` <b>${escapeHtml(user.last_name)}</b>`
  if (user.username) name += ` (@${user.username})`
  name += ` [<code>${user.id}</code>]`

  return name
}

bot.on('new_chat_members', (ctx) => {
  ctx.replyWithHTML(
    `Hai ${buildName(ctx.message.new_chat_member)}, selamat datang di <b>${ctx.chat.title}<>!`, {  
      'reply_to_message_id': ctx.message.message_id,
      'reply_markup': {
        'inline_keyboard': [
          [
            {
              text: 'Harap baca ini dulu',
              url: 'http://telegraf.js.org'
            }
          ]
        ]
      }
    }
  )
})

const secret = Math.random().toString(36).slice(2)
bot.telegram.setWebhook(`${process.env.NOW_URL}/${secret}`)
bot.startWebhook(`/${secret}`, null, process.env.PORT, process.env.HOST)
