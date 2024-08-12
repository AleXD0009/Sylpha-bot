let handler = async (m, { conn, command }) => {

let txt = 
`> *ʙᴜꜱᴄᴀꜱ ᴜɴ ʜᴏꜱᴛ ᴘᴀʀᴀ ʜᴏꜱᴘᴇᴅᴀʀ ᴛᴜꜱ ᴘʀᴏʏᴇᴄᴛᴏꜱ ᴏ ʜᴀᴄᴇʀ ᴜɴ ꜱᴇʀᴠɪᴅᴏʀ ᴅᴇ ᴍɪɴᴇᴄʀᴀꜰᴛ?*
> *ᴛᴇ ᴘʀᴇꜱᴇɴᴛᴏ :*

*\`[ ᴄʟᴏᴜᴅ ꜱᴛᴀʀʟɪɢʜᴛꜱ ]\`*

*\`[ Información del Host ]\`*

*[ DASH ]* 
• https://dashborad.starlights.uk

*[ PANEL ]* 
• https://panel.starlights.uk

`
await conn.sendMessage(m.chat, {
  text: txt,
  contextInfo: {
    forwardingScore: 1,
    isForwarded: false,
    externalAdReply: {
      showAdAttribution: true,
      containsAutoReply: true,
      title: `CLOUD STARLIGHTS`,
      body: ``,
      previewType: "PHOTO",
      thumbnailUrl: 'https://telegra.ph/file/db0ec95ffa17dc003fcb0.jpg',
      sourceUrl: 'https://dashborad.starlights.uk'
    },
  }
}, { quoted: fkontak });

}

handler.help = ['host'] 
handler.tags =['main'] 
handler.command = ['host', 'cloud']

export default handler
