import { ytmp3, ytmp4 } from '@ruhend/scraper';
import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (command === 'play') {
  
if (!text) { return conn.reply(m.chat, '*`Ingresa El Nombre De Lo Que Quieres Buscar`*', m); }

let result = await yts(text);
let ytres = result.videos;

    let res = await yts(text);
    let vid = res.videos[0];
    if (!vid) {
        throw new Error('Resultado no encontrado');
    }
    let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;
  
  
        let txt = '    `𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋`\n\n';
        txt += `> *Título* : _${vid.title}_\n`;
        txt += `> *Creado* : _${vid.ago}_\n`
        txt += `> *Duracion* : _${vid.timestamp}_\n`
        txt += `> *Visitas : _${vid.views.toLocaleString()}_\n`
  
    await conn.sendButton2(m.chat, [
        [txt, author, thumbnail, [
            ['Audio 🎶', `${usedPrefix}ytmp3 ${url}`],
            ['Video 🎥', `${usedPrefix}ytmp4 ${url}`],
        ]],
    ], m);
 }
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play'] 

export default handler
