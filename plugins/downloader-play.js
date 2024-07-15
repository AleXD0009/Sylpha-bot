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
  
  
    let txt = "\t\t\t*`玖 YᴏᴜTᴜʙᴇ 玖`*\n\n";
    txt += "> *`» Titulo :`*" + ` ${vid.title}\n`
    txt += "> *`» Creado :`*" + ` ${vid.ago}\n`
    txt += "> *`» Duracion :`*" + ` ${vid.timestamp}\n`
    txt += "> *`» Visitas :`*" + ` ${vid.views.toLocaleString()}\n`
  
    await conn.sendButtonMessages(m.chat, [
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
