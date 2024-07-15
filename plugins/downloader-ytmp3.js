import ytdl from 'ytdl-core';
import fs from 'fs';
import { promisify } from 'util';
import os from 'os';
import fg from 'api-dylux';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || !args[0]) return conn.reply(m.chat, `✳️ Example:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`, m);
    if (!args[0].match(/youtu/gi)) throw 'Invalid YouTube URL provided.';
    
    try {
        const yt = await fg.yta(args[0]);
        let { title, dl_url } = yt;

        conn.sendFile(m.chat, dl_url, `${title}.mp3`, `
${title}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false });
    } catch (error) {
        console.error(error);
        try {
            const { title, dl_url } = await ytmp3(args[0]);

            conn.sendFile(m.chat, dl_url, `${title}.mp3`, `
≡ ${title}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: false });
        } catch (err) {
            console.error(err);
            await conn.reply(m.chat, '❎ Failed to download the audio.', m);
        }
    }
};

handler.help = ['ytmp3 <url>'];
handler.tags = ['dl'];
handler.command = ['ytmp3', 'fgmp3'];
handler.diamond = false;

export default handler;

const streamPipeline = promisify(require('stream').pipeline);

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
