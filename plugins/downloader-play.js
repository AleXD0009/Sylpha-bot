import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	
if (!text) { 
    return conn.reply(m.chat, '*Ingresa el nombre de lo que quieres buscar*', m); 
            }	
    
let res = await yts(text)
let play = res.videos[0]
if (!play) throw `✳️ Vídeo/Audio no encontrado`
let { title, description, thumbnail, videoId, timestamp, views, ago, url } = play
	//const url = 'https://www.youtube.com/watch?v=' + videoId

let txt = '    `𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋`\n\n';
    txt += `> *Título* : _${play.title}_\n`;
    txt += `> *Creado* : _${play.ago}_\n`;
    txt += `> *Duración* : _${play.timestamp}_\n`;
    txt += `> *Visitas* : _${play.views.toLocaleString()}_\n`;
    txt += `> *Link* : _https://www.youtube.com/watch?v=${play.videoId}_\n`;

    
 await conn.sendButton2(m.chat, txt, botname, thumbnail, [
    ['Audio', `${usedPrefix}ytmp3 ${url}`],
    ['Video', `${usedPrefix}ytmp4 ${url}`]
  ], null, [['Canal', `${canal}`]], m)
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']

export default handler


/*import { ytmp3, ytmp4 } from '@ruhend/scraper';
import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (command === 'play') {
        if (!text) {
            return conn.reply(m.chat, '*Ingresa el nombre de lo que quieres buscar*', m);
        }

        try {
            let result = await yts(text);
            let vid = result.videos[0];

            if (!vid) {
                throw new Error('Resultado no encontrado');
            }

            let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;

            let txt = '    `𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋`\n\n';
            txt += `> *Título* : _${title}_\n`;
            txt += `> *Creado* : _${ago}_\n`;
            txt += `> *Duración* : _${timestamp}_\n`;
            txt += `> *Visitas* : _${views.toLocaleString()}_\n`;

            await conn.sendButton2(m.chat, [
                [txt, thumbnail, '©️  ', [
                    { button: 'Audio 🎶', url: `${usedPrefix}ytmp3 ${url}` },
                    { button: 'Video 🎥', url: `${usedPrefix}ytmp4 ${url}` },
                ]],
            ], m);
        } catch {
        }
    }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;
