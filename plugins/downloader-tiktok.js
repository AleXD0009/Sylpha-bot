import { ttdl } from '@ruhend/scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args || !args[0]) return conn.reply(m.chat, '*`Ingresa un enlace de tiktok`*', m, )
 
try {
await m.react('🕓'); 
let { title, author, username, published, like, comment, share, views, bookmark, video, cover, duration, music, profilePicture } = await ttdl(args[0]);

let txt = '*`T I K T O K - D L`*\n\n';
txt += `> _Título_ : *${title || 'X'}*\n`;
txt += `> _Autor_ : *${author || 'X'}*\n`;
txt += `> _Duración_ : *${duration || 'X'}*\n`;
txt += `> _Vistas_ : *${views || 'X'}*\n`;
txt += `> _Likes_ : *${like || 'X'}*\n`; 
txt += `> _Comentarios_ : *${comment || 'X'}*\n`;
txt += `> _Compartidos_ : *${share || 'X'}*\n`;
txt += `> _Publicado_ : *${published || 'X'}*\n`;

await conn.sendFile(m.chat, video, 'tiktok.mp4', txt, m, null, rcanal);
await m.react('✅'); 
    } catch {
await m.react('❌'); 
}}

handler.help = ['tiktok *<link>*']
handler.tags = ['dl'] 
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i;

export default handler;
