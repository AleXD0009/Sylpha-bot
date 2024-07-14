import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (command === 'facebook') {
        if (!args[0]) return m.reply('*`Ingresa un enlace de facebook`*');

        try {
            const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
            const responseData = await apiResponse.json();

            if (responseData.status) {
                const { data } = responseData;
                const { title, links } = data;

                let listSections = [];
                listSections.push({
                    title: `Descargar Video TikTok: ${title}`,
                    rows: [
                        {
                            header: 'VIDEO CALIDAD NORMAL',
                            title: ` *${links.sd_0.size}*`,
                            description: ``,
                            id: `${usedPrefix}a ${args[0]}`
                        },
                        {
                            header: 'VIDEO CALIDAD HD',
                            title: ` *${links.hd_0.size}*`,
                            description: ``,
                            id: `${usedPrefix}b ${args[0]}`
                        }
                    ]
                });

                await conn.sendList(m.chat, '  ≡ *Calidades*', ``, `Click Aqui`, null, listSections, m);

            } else {
            }
        } catch {
        }
    } else if (['a', 'b'].includes(command)) {
        try {
            const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
            const responseData = await apiResponse.json();

            if (responseData.status) {
                const { data } = responseData;
                const { title, links } = data;

                let txt = `Descarga de video: ${title}\n\n`;

                let mediaUrl;
                if (command === 'a') {
                    mediaUrl = links.sd_0.link;
                    txt += `Calidad Normal`;
                } else if (command === 'b') {
                    mediaUrl = links.hd_0.link;
                    txt += `Calidad HD`;
                }

                await conn.sendFile(m.chat, mediaUrl, 'video.mp4', txt, m);
            } else {
                m.reply('No se pudo obtener el video de TikTok.');
            }
        } catch (error) {
            console.error(error);
            m.reply('Ocurrió un error al intentar descargar el video de TikTok.');
        }
    }
};

handler.help = ['facebook *<enlace>*'];
handler.tags = ['dl'];
handler.command = ['facebook', 'a', 'b'];
export default handler;
