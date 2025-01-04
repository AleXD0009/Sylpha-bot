import { ttdl } from 'ruhend-scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, 'Ingresa un enlace de *tiktok*', m)

 await m.react('🕓')
try {
let { title, author, username, published, like, comment, share, views, bookmark, video, cover, duration, music, profilePicture } = await ttdl(args[0])

let txt = `- *Título :* ${title || '-'}
- *Autor :* ${author || '-'}
- *Duración :* ${duration || '-'}
- *Vistas :* ${views || '-'}
- *Likes :* ${like || '-'}
- *Comentarios :* ${comment || '-'}
- *Publicado :* ${published || '-'}`

await conn.sendFile(m.chat, video, 'Tiktokdl.mp4', txt, m)
await m.react('✅')
} catch {
await m.react('❌') 
}}

handler.help = ['tiktok *<link>*']
handler.tags = ['dl'] 
handler.command = ['tiktok', 'tt']

export default handler
