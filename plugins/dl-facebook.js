import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (command === 'fb') {
        if (!args[0]) return m.reply('*`Ingresa un enlace de Facebook`*');

        try {
            const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
            const responseData = await apiResponse.json();

            if (responseData.success) {
                const { title, src_url, links } = responseData;

                let listSections = [];
                links.forEach((linkObj, index) => {
                    let qualityHeader = `Calidad ${index + 1}`;
                    listSections.push({
                        title: '',
                        rows: [
                            {
                                header: qualityHeader,
                                title: `Descargar ${linkObj.quality}`,
                                description: `Tamaño: ${linkObj.link}`,
                                id: `${usedPrefix}${index + 1} ${args[0]}`
                            }
                        ]
                    });
                });

                await conn.sendList(m.chat, '  ≡ *Opciones de Descarga*', '', 'Click Aquí', null, listSections, m);

            } else {
            }
        } catch {
        }
    } else if (['1', '2', '3', '4', '5'].includes(command)) { 
        try {
            const apiResponse = await fetch(`https://thepapusapifacebook.onrender.com/api/fbvideodownload?url=${args[0]}`);
            const responseData = await apiResponse.json();

            if (responseData.success) {
                const { title, src_url, links } = responseData;

                let selectedQuality = parseInt(command) - 1; 

                const selectedLink = links[selectedQuality];

                let txt = '`Facebook Video - Download`\n\n';
                txt += `⸙͎ *Título ∙* ${title}\n`;
                txt += `⸙͎ *URL Original ∙* ${src_url}\n\n`;

                txt += '*Enlace de descarga seleccionado:*\n';
                txt += `Calidad: ${selectedLink.quality}\nLink: ${selectedLink.link}\n\n`;

                await conn.sendMessage(m.chat, txt, { quoted: m });
            } else {
            }
        } catch {
        }
    }
};

handler.help = ['fb *<link>*'];
handler.tags = ['dl'];
handler.command = ['fb'];
export default handler;
