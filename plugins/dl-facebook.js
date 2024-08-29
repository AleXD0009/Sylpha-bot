import { snapsave } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
if (!args[0]) return m.reply('*Ingresa un enlace de facebook*');

try {
await m.react('🕓'); 
const data = await snapsave(args[0]);

if (!Array.isArray(data) || data.length === 0) return m.reply('*No se pudo descargar el video :/*');

let video = data.find(v => v.resolution.includes('HD')) || data[0];

if (video) {
const videoBuffer = await fetch(video.url).then(res => res.buffer());

await conn.sendMessage( m.chat, { video: videoBuffer, mimetype: 'video/mp4', fileName: 'video.mp4', caption: caption, mentions: [m.sender], },{ quoted: m });
await m.react('✅'); 
);
} else {
await m.react('❌'); 
}
} catch {
await m.react('❌'); 
}
}

handler.help = ['facebook *<link>*'];
handler.tags = ['dl'];
handler.command = ['fb', 'facebook', 'FB', 'FACEBOOK'];

export default handler;
