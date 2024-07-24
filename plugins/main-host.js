let handler = async (m, { conn, command }) => {

let txt = `🎉 *\`¡Descubre FlarexCloud!\`* 🚀

📍 https://billing.flarex.cloud?ref=jndV1w8rgb

*¿Quieres un Host de calidad y con bajos precios?*
Pues te presento a *FlarexCloud*, un hosting de calidad con servidores dedicados y precios por debajo de 1USD, estos servidores están destinados a ofrecerte un Uptime 24/7 para que puedas alojar tus proyectos y qué estos funcionen de manera eficaz.

🟢 \`Información del Host\`

💫 *Página :* 
• https://www.flarex.cloud

🎇 *Panel :* 
• https://gamepanel.flarex.cloud

☁️ *Discord :*
• https://discord.flarex.cloud

💜 *Comunidad :*
• https://whatsapp.flarex.cloud

*Únete a está comunidad y unete a los grupos para probar los bots unicos que hay en flarex y charlar con su hermosa comunidad :D*`
await conn.sendMessage(m.chat, { text: txt,
contextInfo:{
forwardingScore: 1,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": `🟣 FLAREX CLOUD 🟣`,
"body": `🔥 HOSTIN DE CALIDAD ✨`,
"previewType": "PHOTO",
"thumbnailUrl": 'https://telegra.ph/file/8f789f212b6cd978cd45d.jpg', 
"sourceUrl": 'https://billing.flarex.cloud?ref=jndV1w8rgb'}}},
{ quoted: fkontak})
}

handler.help = ['flarex','host'] 
handler.tags =['main'] 
handler.command = ['flarex','host']

export default handler
