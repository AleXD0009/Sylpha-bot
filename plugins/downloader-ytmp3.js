import { ytmp3, ytmp3v3 } from 'ruhend-scraper'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!args || !args[0]) return conn.reply(m.chat, '*_Ingresa un enlace de Youtube_*', m)
try{
await m.react('🕑')
let data = await ytmp3(args[0])
let { audio, title } = data
conn.sendFile(m.chat, audio, title + '.mp3', `${title}`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false })
await m.react('✅')
} catch {
try {
await m.react('🕑')
let data = await ytmp3v3(args[0])
let { audio, title } = data
conn.sendFile(m.chat, audio, title + '.mp3', `${title}`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false })
await m.react('✅')
} catch {
await m.react('❌')
}}}

handler.help = ['ytmp3 *<link>*']
handler.tags = ['dl']
handler.command = ['ytmp3', 'yta', 'ytaudio']

export default handler
