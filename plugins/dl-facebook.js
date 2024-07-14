import { snapsave } from '@bochilteam/scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || args.length === 0) {
        return conn.reply(m.chat, '*`Ingresa un link de facebook`*', m);
    }

    try {
        const link = args[0];
        const data = await snapsave(link);
        
        if (!data) {
            return conn.reply(m.chat, 'No se encontró ningún video para ese enlace.', m);
        }

        const { title, SD, HD } = data;

        if (!SD && !HD) {
            return conn.reply(m.chat, 'No se encontró ningún enlace de descarga válido para ese video.', m);
        }
      
        await conn.sendFile(m.chat, SD || HD, 'fbdl.mp4', `> *Título*: ${title}`, m, null, rcanal);
    } catch {
    }
};

handler.help = ['facebook *<link>*'];
handler.tags = ['dl'];
handler.command = /^(facebook|fb|facebookdl|fbdl)$/i;

export default handler;
