import { ttdl } from '@ruhend/scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args || !args[0]) return conn.reply(m.chat, '*`Ingresa un enlace de tiktok`*', m, )
 
try {
await m.react('🕓'); 
let { title, author, username, published, like, comment, share, views, bookmark, video, cover, duration, music, profilePicture } = await ttdl(args[0]);

let txt = '';
txt += `> _Título_ : *${title || '❌'}*\n`;
txt += `> _Autor_ : *${author || '❌'}*\n`;
txt += `> _Duración_ : *${duration || '❌'}*\n`;
txt += `> _Vistas_ : *${views || '❌'}*\n`;
txt += `> _Likes_ : *${like || '❌'}*\n`; 
txt += `> _Comentarios_ : *${comment || '❌'}*\n`;
txt += `> _Compartidos_ : *${share || '❌'}*\n`;
txt += `> _Publicado_ : *${published || '❌'}*\n`;

await conn.sendFile(m.chat, video, 'tiktok.mp4', txt, m, null, rcanal);
await m.react('✅'); 
    } catch {
await m.react('❌'); 
}}

handler.help = ['tiktok *<link>*']
handler.tags = ['dl'] 
handler.command = ['tiktok', 'tt']

export default handler;
