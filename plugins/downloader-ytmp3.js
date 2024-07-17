import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch' 
//let limit = 100

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) return conn.reply(m.chat, '*`Ingresa Un Link De Youtube`*', m)
if (!args[0].match(/youtu/gi)) return conn.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m).then(_ => m.react('✖️'))
let q = '128kbps'
let user = global.db.data.users[m.sender]

await m.react('🕓')
try {
let v = args[0]
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await yt.audio[q].download()
let title = await yt.title
let size = await yt.audio[q].fileSizeH
let thumbnail = await yt.thumbnail

let img = await (await fetch(`${thumbnail}`)).buffer()  
//if (fileSize > (user.premium ? 300 : 100)) { return await m.reply(`✧ El archivo supera los ${user.premium ? 300 : 100}MB, ${user.premium ? 'se canceló la descarga.' : 'pasate a premium para descargar archivos de hasta 300MB.'}`)}

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, fwc).then(_ => m.react('✖️'))
  /* let txt = "\t\t\t*`玖 YᴏᴜTᴜʙᴇ Mᴘ3 玖`*\n\n"
       txt += '> *`» Titulo :`*' + ` ${title}\n`
       txt += '> *`» Calidad :`*' + ` ${q}\n`
       txt += '> *`» Tamaño :`*' + ` ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fwc)*/
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.yta(args[0], q)
let { title, dl_url, size } = yt 
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid
let img = await (await fetch(`${vid.thumbnail}`)).buffer()  

let fileSize = parseFloat(size.replace(/[^0-9.]/g, ''))
let isGB = size.includes('GB')
if (isGB) fileSize *= 1024
//if (fileSize > (user.premium ? 300 : 100)) { return await m.reply(`El archivo supera los ${user.premium ? 300 : 100}MB, ${user.premium ? 'se canceló la descarga.' : 'pasate a premium para descargar archivos de hasta 300MB.'}`)}

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, fwc).then(_ => m.react('✖️'))
	/*let txt = "\t\t\t*`玖 YᴏᴜTᴜʙᴇ Mᴘ3 玖`*\n\n"
       txt += '> *`» Titulo :`*' + ` ${title}\n`
       txt += '> *`» Calidad :`*' + ` ${q}\n`
       txt += '> *`» Tamaño :`*' + ` ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fwc)*/
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(args[0], q)
let { title, dl_url, size, thumb } = yt 

let img = await (await fetch(`${thumb}`)).buffer()
//if (fileSize > (user.premium ? 300 : 100)) { return await m.reply(`El archivo supera los ${user.premium ? 300 : 100}MB, ${user.premium ? 'se canceló la descarga.' : 'pasate a premium para descargar archivos de hasta 300MB.'}`)}

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, fwc).then(_ => m.react('✖️'))
	/*let txt = "\t\t\t*`玖 YᴏᴜTᴜʙᴇ Mᴘ3 玖`*\n\n"
       txt += '> *`» Titulo :`*' + ` ${title}\n`
       txt += '> *`» Calidad :`*' + ` ${q}\n`
       txt += '> *`» Tamaño :`*' + ` ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fwc)*/
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
    await m.react('✖️');
}}}}

handler.help = ["ytmp3"].map((v) => v + " *<link>*");
handler.tags = ["dl"];
handler.command = /^(yta|ytmp3|audio)$/i;

export default handler;
