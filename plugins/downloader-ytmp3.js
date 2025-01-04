import { ytmp3 } from 'ruhend-scraper'

let handler = async (m, { conn, args, text }) => {
if (!args[0]) return conn.reply(m.chat, 'Ingresa un enlace de *Youtube*', m)

await m.react('🕑')
try{
let data = await ytmp3(args[0])
let { audio, title } = data
conn.sendFile(m.chat, audio, title + '.mp3', `${title}`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false })
await m.react('✅')
} catch {
await m.react('❌')
}}

handler.help = ['ytmp3 *<link>*']
handler.tags = ['dl']
handler.command = ['ytmp3', 'yta'']

export default handler
