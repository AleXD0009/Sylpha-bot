import ytdl from 'ytdl-core'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import fg from 'api-dylux'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) return conn.reply(m.chat, `✳️ Example :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`, m)
  if (!args[0].match(/youtu/gi)) throw ``
 let chat = global.db.data.chats[m.chat]
 let q = '128kbps'
 
 try {

		const yt = await fg.yta(args[0]) 
		let { title, dl_url, quality, size, sizeB } = yt
		
		conn.sendFile(m.chat, dl_url, title + '.mp3', `
  ${title}  ${size}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false })
 	} catch {
  try {
  	
	const { title, dl_url } = await ytmp3(args[0]);
  
		conn.sendFile(m.chat, dl_url, title + '.mp3', `
 ≡  *YTDL 2** : ${title}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false })
        } catch {
			await m.reply(`❎`)
} 
}

}
handler.help = ['ytmp3 <url>']
handler.tags = ['dl']
handler.command = ['ytmp3', 'fgmp3'] 
handler.diamond = false

export default handler

const streamPipeline = promisify(pipeline);

async function ytmp3(url) {
    const videoInfo = await ytdl.getInfo(url);
    const { videoDetails } = videoInfo;
    const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
    const thumbnail = thumbnails[0].url;
    
    const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const tmpDir = os.tmpdir();
    const audioFilePath = `${tmpDir}/${title}.mp3`;

    await streamPipeline(audioStream, fs.createWriteStream(audioFilePath));

    return {
        title,
        views: viewCount,
        publish: uploadDate,
        duration: lengthSeconds,
        quality: '128kbps',
        thumb: thumbnail,
        dl_url: audioFilePath
    };
}
