import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '*`Ingresa el enlace del vídeo de Instagram junto al comando.`*', m)
let enviando;
  if (enviando) return;
  enviando = true;
  
  let youtubeLink = '';
  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0) {
      if (Array.isArray(global.videoList) && global.videoList.length > 0) {
        const matchingItem = global.videoList.find((item) => item.from === m.sender);
        if (matchingItem) {
          if (index < matchingItem.urls.length) {
            youtubeLink = matchingItem.urls[index];
          } else {
            throw `  ${matchingItem.urls.length}*`;
          }
        } else {
          throw `  (${usedPrefix + command} ${usedPrefix}playlist <texto>*`;
        }
      } else {
        throw `(${usedPrefix + command} ${tradutor.texto3[1]} ${usedPrefix}playlist <texto>*`;
      }
    }
  }
  
  const { key } = await conn.sendMessage(m.chat, { text: null }, { quoted: m });
  
  try {
    const yt_play = await yts(youtubeLink);
    const audioUrl = `https://api-brunosobrino.onrender.com/api/v1/ytmp3?url=${yt_play.all[0].url}&apikey=BrunoSobrino`;
    const buff_aud = await getBuffer(audioUrl);
    const fileSizeInBytes = buff_aud.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
    const title = yt_play.all[0].title;

    if (fileSizeInMB > 50) {
      await conn.sendMessage(m.chat, { document: buff_aud, caption: `Titulo ${title}\nTamaño ${roundedFileSizeInMB} MB`, fileName: title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m });
      await conn.sendMessage(m.chat, { text: `Tamaño ${roundedFileSizeInMB} Titulo ${title}`, edit: key }, { quoted: m });
      enviando = false;
    } else {
      await conn.sendMessage(m.chat, { audio: buff_aud, caption: `Titulo ${title}\nTamaño ${roundedFileSizeInMB} MB`, fileName: title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m });
      await conn.sendMessage(m.chat, { text: `${tradutor.texto5[4]}`, edit: key }, { quoted: m });
      enviando = false;
    }
  } catch (error) {
    console.log('Primera API falló, intentando con la segunda...');
    try {
      const yt_play = await yts(youtubeLink);
      const audioUrl = `https://api-brunosobrino.onrender.com/api/v2/ytmp3?url=${yt_play.all[0].url}&apikey=BrunoSobrino`;
      const buff_aud = await getBuffer(audioUrl);
      const fileSizeInBytes = buff_aud.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
      const title = yt_play.all[0].title;

      if (fileSizeInMB > 50) {
        await conn.sendMessage(m.chat, { document: buff_aud, caption: `Titulo ${title}\nTamaño ${roundedFileSizeInMB} MB`, fileName: title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m });
        await conn.sendMessage(m.chat, { text: `Tamaño ${roundedFileSizeInMB} MB Texto ${title}`, edit: key }, { quoted: m });
        enviando = false;
      } else {
        await conn.sendMessage(m.chat, { audio: buff_aud, caption: `Titulo ${title}\npeso ${roundedFileSizeInMB} MB`, fileName: title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m });
        enviando = false;
      }
    } catch {
    }
  }
};

handler.command = /^(audio|fgmp3|dlmp3|getaud|yt(a|mp3))$/i;
export default handler;

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });

    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
