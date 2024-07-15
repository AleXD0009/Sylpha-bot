import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 100

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
 if (!args || !args[0]) return conn.reply(m.chat, '`Ingresa el link de un video de youtube`', m)
if (!args[0].match(/youtu/gi)) return conn.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m)
let q = '128kbps'

await m.react('🕓')
try {
let v = args[0]
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await yt.audio[q].download()
let title = await yt.title
let size = await yt.audio[q].fileSizeH
let thumbnail = await yt.thumbnail

if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal)
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.yta(args[0], q)
let { title, dl_url, size } = yt 
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal)
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(args[0], q)
let { title, dl_url, size, thumb } = yt 

if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal)
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('❌')
}}}}
}
handler.help = ['play', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.command = ['play','play2','ytmp3'];

export default handler
