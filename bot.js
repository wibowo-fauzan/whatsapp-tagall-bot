// bot.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Import commands
const handleTag = require('./commands/tag');
const handleSticker = require('./commands/sticker');
const handleGif = require('./commands/gif');
const handleMenu = require('./commands/menu');
const handleToImg = require('./commands/toimg');
const handleBadWords = require('./commands/badwords');

// Inisialisasi client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// QR Code untuk login
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('[QR] Scan QR code dengan WhatsApp Anda.');
});

// Jika sudah siap
client.on('ready', () => {
    console.log('[BOT] Client siap digunakan!');
});

// Listener pesan masuk
client.on('message', async msg => {
    console.log(`[DEBUG] Pesan diterima: "${msg.body}" dari chat ID: ${msg.from}`);

    try {
        // 🔹 1. Cek kata kasar dulu
        await handleBadWords(msg);

        // 🔹 2. Deteksi perintah
        const command = msg.body?.trim().toLowerCase().split(/\s+/)[0];

        if (command === '.tag') return handleTag(client, msg);
        if (command === '.sticker') return handleSticker(msg);
        if (command === '.gif') return handleGif(msg);
        if (command === '.menu') return handleMenu(msg);
        if (command === '.toimg') return handleToImg(msg);

        console.log('[DEBUG] Bukan perintah yang dikenal, dilewati.');
    } catch (err) {
        console.error('[ERROR] Kesalahan umum:', err);
        msg.reply('❌ Terjadi kesalahan saat memproses perintah.');
    }
});

// Jalankan bot
client.initialize();