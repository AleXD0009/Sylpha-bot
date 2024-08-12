import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '_Ingresa el nombre de lo que quieres buscar_', m);

await m.react('🕓');
let res = await yts(text);
let play = res.videos[0];

if (!play) return conn.reply(m.chat, `No se encontraron resultados`, m)

let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

let txt = '';
txt += `> _Título_ : *${title || '❌'}*\n`;
txt += `> _Creado_ : *${ago || '❌'}*\n`;
txt += `> _Duración_ : *${timestamp || '❌'}*\n`;
txt += `> _Visitas_ : *${views.toLocaleString() || '❌'}*\n`;
txt += `> _Link_ : *https://www.youtube.com/watch?v=${videoId}*\n`;

await conn.sendButton2(m.chat, txt, author, thumbnail, [
['Audio', `${usedPrefix}ytmp3 ${url}`],
['Video', `${usedPrefix}ytmp4 ${url}`]
], null, [['Canal', canal]], m);
await m.react('✅')
}

handler.help = ['play', 'play2']
handler.tags = ['dl'];
handler.command = ['play', 'play2']

export default handler;
