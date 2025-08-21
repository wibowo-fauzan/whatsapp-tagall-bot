module.exports = async (client, msg) => {
    console.log('[DEBUG] Perintah .tag terdeteksi.');

    const parts = msg.body.trim().split(/\s+/);
    parts.shift(); // hapus ".tag"
    const extraText = parts.join(" ").trim();

    const chat = await msg.getChat();
    if (!chat.isGroup) {
        console.log('[DEBUG] Chat bukan grup.');
        return msg.reply('❌ Perintah ini hanya bisa dijalankan di grup.');
    }

    let participants = chat.participants || [];
    console.log(`[DEBUG] Jumlah peserta ditemukan: ${participants.length}`);

    if (!participants.length) {
        return msg.reply('⚠️ Tidak ada peserta ditemukan di grup.');
    }

    let text = '*📢 Attention semua anggota:* \n';
    const mentions = [];

    if (extraText) {
        text += `${extraText}\n\n`;
    }

    for (const p of participants) {
        try {
            const contact = await client.getContactById(p.id._serialized);
            if (!contact) continue;
            mentions.push(contact);
            text += `@${contact.id.user} `;
        } catch (err) {
            console.error(`[ERROR] Gagal ambil contact ID: ${p.id._serialized}`, err);
        }
    }

    if (!mentions.length) {
        return msg.reply('⚠️ Tidak bisa mention siapapun. Bot mungkin tidak punya akses kontak.');
    }

    await chat.sendMessage(text, { mentions });
    console.log(`[BOT] Berhasil mention ${mentions.length} anggota di grup "${chat.name}".`);

    await msg.reply('✅ Hi!, Perintah .tag diterima, Bot Fauzan Berjalan . . . ', msg.from, { quotedMessageId: msg.id._serialized });
};
