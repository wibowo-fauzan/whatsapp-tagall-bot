// commands/sticker.js
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (msg) => {
    console.log('[DEBUG] Perintah .sticker terdeteksi.');

    try {
        // Ambil teks setelah perintah
        const args = msg.body.trim().split(' ').slice(1).join(' ');
        let packName = 'StickerKu'; // default pack
        let authorName = 'Bot';     // default author

        // Kalau user pakai format: .sticker Pack|Author
        if (args.includes('|')) {
            const parts = args.split('|');
            packName = parts[0].trim() || packName;
            authorName = parts[1].trim() || authorName;
        } else if (args) {
            // Kalau cuma satu kata → jadi pack
            packName = args;
        }

        let media;

        // Kasus 1: kirim gambar + caption .sticker
        if (msg.hasMedia) {
            media = await msg.downloadMedia();
        }
        // Kasus 2: reply gambar
        else if (msg.hasQuotedMsg) {
            const quoted = await msg.getQuotedMessage();
            if (quoted.hasMedia) {
                media = await quoted.downloadMedia();
            }
        }

        if (!media) {
            return msg.reply('❌ Kirim `.sticker` dengan gambar atau reply ke gambar.\n\nContoh: `.sticker Fauzan|Bot`');
        }

        // Kirim balik sebagai sticker dengan metadata
        await msg.reply(media, msg.from, {
            sendMediaAsSticker: true,
            stickerMetadata: {
                pack: packName,
                author: authorName
            }
        });

        console.log(`[BOT] Stiker berhasil dibuat. Pack: "${packName}" | Author: "${authorName}"`);

    } catch (err) {
        console.error('[ERROR] Gagal membuat stiker:', err);
        msg.reply('⚠️ Terjadi kesalahan saat membuat stiker.');
    }
};
