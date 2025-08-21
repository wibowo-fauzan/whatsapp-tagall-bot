const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (msg) => {
    console.log('[DEBUG] Perintah .gif terdeteksi.');

    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        if (!media) {
            return msg.reply('⚠️ Gagal download media.');
        }

        // Kirim sebagai sticker animasi (GIF/Video jadi sticker bergerak)
        await msg.reply(media, msg.from, { sendMediaAsSticker: true, stickerAuthor: "Bot Fauzan", stickerName: "GIFSticker" });
        console.log('[BOT] Sticker GIF berhasil dibuat.');
    } else {
        msg.reply('❌ Kirim perintah `.gif` bersamaan dengan video/gif pendek.');
    }
};
