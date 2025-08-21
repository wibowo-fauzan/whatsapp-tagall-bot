const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Import command handler
const handleTag = require('./commands/tag');
const handleSticker = require('./commands/sticker');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('[QR] Scan QR code dengan WhatsApp Anda.');
});

client.on('ready', () => {
    console.log('[BOT] Client siap digunakan!');
});

client.on('message', async msg => {
    console.log(`[DEBUG] Pesan diterima: "${msg.body}" dari chat ID: ${msg.from}`);

    try {
        const command = msg.body?.trim().toLowerCase().split(/\s+/)[0];

        if (command === '.tag') {
            return handleTag(client, msg);
        }

        if (command === '.sticker') {
            return handleSticker(msg);
        }

        console.log('[DEBUG] Bukan perintah .tag atau .sticker, dilewati.');
    } catch (err) {
        console.error('[ERROR] Kesalahan umum:', err);
        msg.reply('❌ Terjadi kesalahan saat memproses perintah.');
    }
});

client.initialize();
