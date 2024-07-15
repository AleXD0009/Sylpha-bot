import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply('*`Ingresa un enlace de facebook`*');

  try {
await m.react('🕓'); 
    const apiResponse = await fetch(`https://thepapusteam.koyeb.app/api/fbvideodownload?url=${args[0]}`);
    const responseData = await apiResponse.json();
    
    if (responseData.success) {
      const { title, links } = responseData;
      let txt = '    `Facebook downloader`\n\n';
      txt += `> *Titulo* : _${title}_\n`;

      await conn.sendMessage(m.chat, { video: { url: links[0].link }, caption: txt }, { quoted: m });
await m.react('✅'); 
    } else {
    }
  } catch {
await m.react('❌'); 
  }
}

handler.help = ['facebook *<link>*'];
handler.tags = ['dl'];
handler.command = ['fb', 'facebook', 'FB', 'FACEBOOK'];
export default handler;
