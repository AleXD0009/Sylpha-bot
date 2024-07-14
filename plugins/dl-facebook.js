import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply('*`Ingresa un enlace de facebook`*');

  try {
    const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
    const responseData = await apiResponse.json();
    
    if (responseData.success) {
      const { title, links } = responseData;
      let txt = '    `Facebook downloader`\n\n';
      txt += `> *Titulo* : _${title}_\n`;

      await conn.sendMessage(m.chat, { video: { url: links[0].link }, caption: txt }, { quoted: m });
    } else {
    }
  } catch {
  }
}

handler.help = ['facebook *<link>*'];
handler.tags = ['downloader'];
handler.command = ['fb', 'facebook'];
export default handler;
