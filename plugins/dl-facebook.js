import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (command === 'facebook') {
    if (!args[0]) return m.reply('*`Ingresa un enlace de Facebook`*');

    try {
      await m.react('🕓');

      const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
      const responseData = await apiResponse.json();

      if (responseData.success) {
        const { title, links } = responseData;

        let listSections = [];
        listSections.push({
          title: '≡ Calidades',
          rows: [
            {
              header: '',
              title: '360p',
              description: '',
              id: `${usedPrefix}a ${args[0]}`
            },
            {
              header: '',
              title: '560p',
              description: '',
              id: `${usedPrefix}b ${args[0]}`
            },
            {
              header: '',
              title: '720p',
              description: '',
              id: `${usedPrefix}c ${args[0]}`
            }
          ]
        });

        await conn.sendList(m.chat, 'Facebook Downloader', `"${title}"`, 'Haz clic aquí', null, listSections, m);

        let txt = '    `Facebook downloader`\n\n';
        txt += `> *Titulo* : _${title}_\n`;

        let mediaUrl;

        if (['a', 'b', 'c'].includes(command)) {
          if (command === 'a') {
            mediaUrl = links.find(link => link.quality === 'sd_0')?.link;
          } else if (command === 'b') {
            mediaUrl = links.find(link => link.quality === 'hd_0')?.link;
          } else if (command === 'c') {
            mediaUrl = links.find(link => link.quality === 'render_720p_0')?.link;
          }
        }

        if (mediaUrl) {
          await conn.sendMessage(m.chat, { video: { url: mediaUrl }, caption: txt }, { quoted: m });
          await m.react('✅');
        } else {
          await m.react('❌');
        }
      } else {
      }

    } catch {
      await m.react('❌');
    }
  }
}

handler.help = ['facebook *<link>*'];
handler.tags = ['downloader'];
handler.command = ['facebook', 'a', 'b', 'c'];
export default handler;


/*import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply('*`Ingresa un enlace de facebook`*');

  try {
await m.react('🕓'); 
    const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
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
handler.tags = ['downloader'];
handler.command = ['fb', 'facebook'];
export default handler;*/
