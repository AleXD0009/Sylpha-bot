let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;JTxꜱ⁩;;\nFN:JTxꜱ\nORG:JTxꜱ\nTITLE:\nitem1.TEL;waid=5491126788746:5491126788746\nitem1.X-ABLabel:JTxꜱ\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:JTxꜱ\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'JTxꜱ', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
