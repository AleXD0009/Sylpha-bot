import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args || !args[0]) return conn.reply(m.chat, '*`Ingresa un link de facebook`*', m)
try {
let { title, SD, HD } = await Starlights.fbdl(args[0])
await conn.sendFile(m.chat, SD || HD, 'fbdl.mp4', `> *Título* : ${title}`, m, null, rcanal)
} catch {
}}
handler.help = ['fb *<link>*']
handler.tags = ['dl'] 
handler.command = /^(facebook|fb|facebookdl|fbdl)$/i

export default handler
