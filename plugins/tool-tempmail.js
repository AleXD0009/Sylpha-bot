import { TempMail } from 'tempmail.lol';
import axios from 'axios';
const tempmail = new TempMail();
const handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const inbox = await tempmail.createInbox();
      const mensajeCorreo = '*`𝐃𝐢𝐫𝐞𝐜𝐜𝐢𝐨𝐧 𝐝𝐞𝐥 𝐜𝐨𝐫𝐫𝐞𝐨 𝐭𝐞𝐦𝐩𝐨𝐫𝐚𝐥 :`*\n' + ` ${inbox.address}\n\n> ᴜɴ ᴛᴏᴋᴇɴ ᴘᴀʀᴀ ᴠᴇʀɪꜰɪᴄᴀʀ ᴇꜱᴛᴀ ʙᴀɴᴅᴇᴊᴀ ᴅᴇ ᴇɴᴛʀᴀᴅᴀ ꜱᴇ ᴇɴᴠɪᴀʀÁ ᴇɴ ᴇʟ ꜱɪɢᴜɪᴇɴᴛᴇ ᴍᴇɴꜱᴀᴊᴇ. Úꜱᴀʟᴏ ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ .checkmail.\n\nToken: ${inbox.token}`;
      const url = "https://i.imgur.com/wLYsnXG.jpeg";
      const responseImg = await axios.get(url, { responseType: 'arraybuffer' });
      await conn.sendFile(m.chat, responseImg.data, "thumbnail.png", mensajeCorreo, m, null, rcanal);
      
      await m.reply(inbox.token);
      await m.react("📧");
    } catch (error) {
      console.error('Error al crear la dirección de correo temporal:', error);
      await m.reply('*`No se pudo crear una dirección de correo temporal.`*');
    }
  } else if (command === 'checkmail') {
    if (!text) {
      await m.reply('*`Proporciona el toke del correo temporal que deseas verificar`*');
      return;
    }
    try {
      const emails = await tempmail.checkInbox(text);
      if (!emails || emails.length === 0) {
        await m.reply('*`No se encontraron mensajes o la bandeja de entrada ha expirado.`*');
        return;
      }
      const mensajes = emails.map(email => {
        return `
De: ${email.from}
Asunto: ${email.subject}
Fecha: ${new Date(email.date).toLocaleString()}
Cuerpo:
${email.body}
        `;
      }).join('\n\n---\n\n');
      const mensajeRespuesta = '*`Mensajes en la bandeja de entrada :`*' + `\n\n${mensajes}`;
      await m.reply(mensajeRespuesta);
    } catch {
    }
  }
};
handler.help = ['tempmail', 'checkmail <token>'];
handler.tags = ['tools'];
handler.command = ['tempmail', 'checkmail'];
handler.register = false;
export default handler;
