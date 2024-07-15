import fetch from "node-fetch"
import ytdl from "ytdl-core"
import yts from "yt-search"
import {
    generateWAMessageFromContent
} from "@whiskeysockets/baileys"
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `🚩 Use example ${usedPrefix}${command} naruto blue bird`
  let vid = await searchAndFilterVideos(text)
  await conn.sendMessage(m.chat, { react: { text: "⏳",key: m.key,}
  })  
  if (!vid) throw 'Tidak di temukan, coba untuk membalikkan judul dan author nya'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime, author } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  const combinedRegex = /^(play|ytplay|ytmp3|playmp3|playmp4|ytplaymp4)$/i
  const isMP3 = combinedRegex.test(command)
  let vap = `
𝑻𝒊𝒕𝒍𝒆: ${title}
𝑼𝒓𝒍: ${url}
𝑺𝒊𝒛𝒆: ${formatBytes(ytdl.size)}
𝑫𝒆𝒔𝒄𝒓𝒊𝒑𝒕𝒊𝒐𝒏 ${description}
𝑷𝒖𝒃𝒍𝒊𝒔𝒉𝒆𝒅: ${publishedTime ? publishedTime : 'tidak diketahui'}
𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏: ${durationH ? durationH : 'tidak diketahui'}
𝑽𝒊𝒆𝒘: ${viewH ? viewH : 'tidak diketahui'}
`
  conn.sendMessage(m.chat, {
    text: vap,
    contextInfo: {
      externalAdReply: {
        title: `Y O U T U B E  •  P L A Y`,
        thumbnailUrl: thumbnail,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m }) 
  if (isMP3) { 
    let Ytdl = await ytmp3(url)
    let doc = {
      audio: Ytdl.buffer,
      mimetype: "audio/mp4",
      fileName: `${title}`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: `Regards By FuadXy`,
          sourceUrl: url,
          thumbnail: await(await conn.getFile(thumbnail)).data
        }
      }
    }
    await conn.sendMessage(m.chat, doc, {
      quoted: m
    })
  }
}

handler.help = ['play'].map(v => v + ' <>')
handler.tags = ['downloader']
handler.command = /^ytmp3$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

function formatNumber(num) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const numString = Math.abs(num).toString();
    const numDigits = numString.length;

    if (numDigits <= 3) {
        return numString;
    }
function formatBytes(bytes) {
    if (bytes === 0 || isNaN(bytes)) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
    }

    const suffixIndex = Math.floor((numDigits - 1) / 3);
    let formattedNum = (num / Math.pow(1000, suffixIndex)).toFixed(1);

    // Menghapus desimal jika angka sudah bulat
    if (formattedNum.endsWith('.0')) {
        formattedNum = formattedNum.slice(0, -2);
    }

    return formattedNum + suffixes[suffixIndex];
}

async function searchAndFilterVideos(query, maxResults = 100, similarityThreshold = 0.5) {
    try {
        const res = await yts(query);
        const videos = res.videos
            .slice(0, maxResults)
            .filter(video => {
                const titleWords = video.title.toLowerCase().split(" ");
                const queryWords = query.toLowerCase().split(" ");
                const matchCount = titleWords.filter(word => queryWords.includes(word)).length;
                return matchCount / titleWords.length >= similarityThreshold;
            });

        if (videos.length > 0) {
            return videos[0];
        } else if (res.videos.length > 0) {
            return res.videos[0];
        } else {
            return {};
        }
    } catch (e) {
        console.error(e);
        return {};
    }
}

async function ytmp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 140
        });
        const chunks = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
};

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedDuration = [];

    if (hours > 0) {
        formattedDuration.push(`${hours} hour`);
    }

    if (minutes > 0) {
        formattedDuration.push(`${minutes} minute`);
    }

    if (remainingSeconds > 0) {
        formattedDuration.push(`${remainingSeconds} second`);
    }

    return formattedDuration.join(' ');
}

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function ytmp4(query, quality = 134) {
    try {
        const videoInfo = await ytdl.getInfo(query, {
            lang: 'id'
        });
        const format = ytdl.chooseFormat(videoInfo.formats, {
            format: quality,
            filter: 'videoandaudio'
        })
        let response = await fetch(format.url, {
            method: 'HEAD'
        });
        let contentLength = response.headers.get('content-length');
        let fileSizeInBytes = parseInt(contentLength);
        return {
            title: videoInfo.videoDetails.title,
            thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
            date: videoInfo.videoDetails.publishDate,
            duration: formatDuration(videoInfo.videoDetails.lengthSeconds),
            channel: videoInfo.videoDetails.ownerChannelName,
            quality: format.qualityLabel,
            contentLength: formatBytes(fileSizeInBytes),
            description: videoInfo.videoDetails.description,
            videoUrl: format.url
        }
    } catch (error) {
        throw error
    }
}
