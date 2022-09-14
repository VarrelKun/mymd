let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `kalo kamu nemu pesan eror, lapor pake perintah ini\n\ncontoh:\n${usedPrefix + command} selamat siang owner, sy menemukan eror seperti berikut <copy/tag pesan erornya>`
    if (text.length < 10) throw `Laporan terlalu pendek, minimal 10 karakter!`
    if (text.length > 1000) throw `Laporan terlalu panjang, maksimal 1000 karakter!`
    let teks = `*${command.toUpperCase()}!*\n\n📮 Dari : *@${m.sender.split`@`[0]}*\n\n✉️ Pesan : ${text}\n`
   let hftextt = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "6285954184111-6285954184111@g.us" } : {}) 
                },
	 message: { 
		"extendedTextMessage": {
                 "text": `${usedPrefix}${command} ${text}`,
                 "title": '',
                 'jpegThumbnail': await (await fetch('https://telegra.ph/file/a333980962233d5e64cf5.jpg')).buffer()
                        }
	                  } 
                     }
 conn.reply(global.owner[0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, hftextt, {
    	mentions: [m.sender]
    })
    conn.sendMessage(m.chat, {
    	react: {
    		text: "🆗",
    		key: m.key
    	}
    })	
    conn.send2ButtonLoc(m.chat, 'https://telegra.ph/file/cf6bc4ba307895269af36.jpg',`Masalah telah di laporkan ke @${global.owner[0].split('@')[0]}, jika ${command.toLowerCase()} hanya main-main tidak akan ditanggapi.`, wm, 'Owner', '.owner', 'Menu', '.menu', m)
}
handler.help = ['report', 'request'].map(v => v + '<text>')
handler.tags = ['info']
handler.command = /^(report|request)$/i
handler.limit = true
handler.private = false

module.exports = handler
