// commands/toimg.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleToImg(msg) {
    console.log('[DEBUG] Perintah .toimg terdeteksi.');

    // Cek apakah pesan mereply stiker
    if (!msg.hasQuotedMsg) {
        return msg.reply('⚠️ Gunakan perintah ini dengan mereply sebuah stiker.');
    }

    const quoted = await msg.getQuotedMessage();
    if (quoted.type !== 'sticker') {
        return msg.reply('❌ Perintah .toimg hanya bisa dipakai untuk stiker.');
    }

    try {
        // Download stiker
        const media = await quoted.downloadMedia();
        if (!media) {
            return msg.reply('❌ Gagal download stiker.');
        }

        // Pastikan folder tmp ada
        const tmpDir = path.join(__dirname, '../tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        const inputPath = path.join(tmpDir, `${Date.now()}-sticker.webp`);
        const outputPath = path.join(tmpDir, `${Date.now()}-sticker.png`);

        // Simpan file webp
        fs.writeFileSync(inputPath, media.data, 'base64');
        console.log(`[DEBUG] Stiker disimpan sementara: ${inputPath}`);

        // Konversi dengan sharp
        await sharp(inputPath)
            .png()
            .toFile(outputPath);

        console.log(`[DEBUG] Konversi berhasil: ${outputPath}`);

        // Kirim balik hasil
        const imgMedia = MessageMedia.fromFilePath(outputPath);
        await msg.reply(imgMedia);

        // Hapus file sementara (opsional)
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

    } catch (err) {
        console.error('[ERROR] Gagal konversi sticker ke gambar:', err);
        msg.reply('❌ Gagal konversi sticker ke gambar.');
    }
};
