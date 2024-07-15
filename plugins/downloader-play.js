import { ytmp3v2 } from '@ruhend/scraper';
import yts from 'yt-search';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (command === 'play' || command === 'play2') {
        if (!text) {
            return conn.reply(m.chat, '*Ingresa el nombre de lo que quieres buscar*', m);
        }

        try {
await m.react('🕓'); 
            let res = await yts(text);
            let play = res.videos[0];

            if (!play) {
                throw `Error: Vídeo no encontrado`;
            }

            let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

            let txt = '`𝐘𝐨𝐮𝐭𝐮𝐛𝐞 - 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝`\n\n';
            txt += `> *Título* : _${title}_\n`;
            txt += `> *Creado* : _${ago}_\n`;
            txt += `> *Duración* : _${timestamp}_\n`;
            txt += `> *Visitas* : _${views.toLocaleString()}_\n`;
            txt += `> *Link* : _https://www.youtube.com/watch?v=${videoId}_\n`;

            await conn.sendButton2(m.chat, txt, 'Nombre del bot', thumbnail, [
                ['Audio', `${usedPrefix}ytmp3 ${url}`],
                ['Video', `${usedPrefix}ytmp4 ${url}`]
            ], null, [['Canal', 'Nombre del canal']], m);
await m.react('✅'); 
        } catch {
await m.react('❌'); 
        }
    }

    if (command === 'ytmp3') {
        if (!text) {
            return conn.reply(m.chat, '*Ingresa la URL de YouTube*', m);
        }

        try {
await m.react('🕒'); 
            const { title, audio } = await ytmp3v2(text);

            let txt = '`Descarga de Audio desde YouTube`\n\n';
            txt += `> *Título* : _${title}_\n`;

await conn.reply(m.chat, txt)
await conn.sendMessage(m.chat, { audio: { url: audio }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅'); 
        } catch {
await m.react('❌'); 
        }
    }
};

handler.help = ['play', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.command = ['play', 'play2', 'ytmp3'];

export default handler;
