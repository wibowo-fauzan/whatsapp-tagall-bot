const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (msg) => {
    console.log('[DEBUG] Perintah .sticker terdeteksi.');

    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        if (!media) {
            return msg.reply('⚠️ Gagal download media.');
        }

        await msg.reply(media, msg.from, { sendMediaAsSticker: true });
        console.log('[BOT] Stiker berhasil dibuat.');
    } else {
        msg.reply('❌ Kirim perintah `.sticker` bersamaan dengan gambar.');
    }
};
