import { ttdl } from '@ruhend/scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args || !args[0]) return conn.reply(m.chat, '*`Ingresa un enlace de tiktok`*', m, )
    try {
await m.react('🕓'); 
        let {
            title,
            author,
            username,
            published,
            like,
            comment,
            share,
            views,
            bookmark,
            video,
            cover,
            duration,
            music,
            profilePicture
        } = await ttdl(args[0]);

        let txt = '    `Tiktok downloader`\n\n';
        txt += `> *Título* : _${title}_\n`;
        txt += `> *Autor* : _${author}_\n`;
        txt += `> *Duración* : _${duration}_\n`;
        txt += `> *Vistas* : _${views}_\n`;
        txt += `> *Likes* : _${like}_\n`; 
        txt += `> *Comentarios* : _${comment}_\n`;
        txt += `> *Compartidos* : _${share}_\n`;
        txt += `> *Publicado* : _${published}_\n`;

        await conn.sendFile(m.chat, video, 'tiktok.mp4', txt, m, null, rcanal);
        await m.react('✅'); 
    } catch {
        await m.react('❌'); 
    }
};

handler.help = ['tiktok *<link>*']
handler.tags = ['dl'] 
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i;
handler.customPrefix = /^(https:\/\/tiktok/gi)$/i;
handler.command = new RegExp


export default handler;
