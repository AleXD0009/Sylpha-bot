import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  
if (!args[0]) return m.reply(`*Ingrese un enlace de YouTube*`)
  
let res = await fetch("https://api.lolhuman.xyz/api/ytaudio?apikey=GataDiosV2&url="+args[0])
let json = await res.json()
  
await conn.sendFile(m.chat, json.result.link.link, 'error.mp3', '', m, false, { mimetype: 'audio/mp4' })}

handler.command = /^(ytmp3)$/i

export default handler
