import fetch from 'node-fetch'

export async function before(m, { conn }) {

global.rcanal = {
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: id_canal,
serverMessageId: 100,
newsletterName: name_canal,
}}}

/* global.adReply = {
	    contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: null,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: img,
                    thumbnail: img,
		           sourceUrl: null,
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}*/
}
