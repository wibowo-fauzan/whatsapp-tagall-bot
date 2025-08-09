const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
        // Cek apakah pesan diawali @ping
        if (!msg.body || !msg.body.trim().toLowerCase().startsWith('@ping')) {
            console.log('[DEBUG] Bukan perintah @ping, dilewati.');
            return;
        }

        console.log('[DEBUG] Perintah @ping terdeteksi.');

        // Ambil teks setelah @ping (jika ada)
        const parts = msg.body.trim().split(/\s+/);
        parts.shift(); // hapus "@ping"
        const extraText = parts.join(" ").trim(); // sisanya jadi tambahan text

        // Auto-reply langsung ke pesan yang kirim @ping
        await msg.reply('✅ Hi!, Perintah @ping diterima, Bot Fauzan Berjalan . . . ', msg.from, { quotedMessageId: msg.id._serialized });

        const chat = await msg.getChat();
        if (!chat.isGroup) {
            console.log('[DEBUG] Chat bukan grup.');
            return msg.reply('❌ Perintah ini hanya bisa dijalankan di grup.');
        }

        // Ambil semua peserta grup
        let participants = chat.participants || [];
        console.log(`[DEBUG] Jumlah peserta ditemukan: ${participants.length}`);

        if (!participants.length) {
            return msg.reply('⚠️ Tidak ada peserta ditemukan di grup.');
        }

        let text = '*📢 Attention semua anggota:* \n';
        const mentions = [];

        for (const p of participants) {
            try {
                const contact = await client.getContactById(p.id._serialized);
                if (!contact) {
                    console.warn(`[WARN] Tidak bisa ambil contact ID: ${p.id._serialized}`);
                    continue;
                }
                mentions.push(contact);
                text += `@${contact.id.user} `;
            } catch (err) {
                console.error(`[ERROR] Gagal ambil contact ID: ${p.id._serialized}`, err);
            }
        }

        // Kalau ada text tambahan, tambahkan di bawah mention
        if (extraText) {
            text += `\n\n${extraText}`;
        }

        console.log('[DEBUG] Mentions siap:', mentions.map(m => m.id._serialized));

        if (!mentions.length) {
            return msg.reply('⚠️ Tidak bisa mention siapapun. Bot mungkin tidak punya akses kontak.');
        }

        await chat.sendMessage(text, { mentions });
        console.log(`[BOT] Berhasil mention ${mentions.length} anggota di grup "${chat.name}".`);

    } catch (err) {
        console.error('[ERROR] Kesalahan umum:', err);
        msg.reply('❌ Terjadi kesalahan saat memproses perintah.');
    }
});

client.initialize();
