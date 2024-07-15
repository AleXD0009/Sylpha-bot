import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
            if (!text) {
                return conn.reply(m.chat, '*Ingresa el nombre de lo que quieres buscar*', m);
            }

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

            await conn.sendButton2(m.chat, txt, author, thumbnail, [
                ['Audio', `${usedPrefix}ytmp3 ${url}`],
                ['Video', `${usedPrefix}ytmp4 ${url}`]
            ], null, [['Canal', 'Nombre del canal']], m);
            await m.react('✅');
        }

handler.help = ['play', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];

export default handler;
