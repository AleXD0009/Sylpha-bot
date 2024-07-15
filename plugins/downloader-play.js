import yts from 'yt-search'
import { ytmp3, ytmp4 } from '@ruhend/scraper'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	
if (command == 'play' || command == 'play2') {
if (!text) { 
    return conn.reply(m.chat, '*`Ingresa el nombre de lo que quieres buscar`*', m); 
            }	
    
let res = await yts(text)
let play = res.videos[0]
if (!play) throw `Error`
let { title, description, thumbnail, videoId, timestamp, views, ago, url } = play

let txt = '`𝐘𝐨𝐮𝐭𝐮𝐛𝐞 - 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝`\n\n';
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
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']

export default handler
