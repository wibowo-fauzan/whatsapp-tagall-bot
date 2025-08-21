// commands/badwords.js

// daftar kata kasar → bisa ditambah terus
const BADWORDS = [
    'anjing', 'kontol', 'babi', 'memek', 'ngentot', 'bangsat', 'jembut',
    'tai', 'kntl', 'meki', 'pler', 'peler', 'titit', 'pepek', 'kampang',
    'asu', 'keparat', 'goblog', 'goblok', 'tolol', 'idiot', 'brengsek',
    'monyet', 'setan', 'kunyuk', 'kimak', 'sundal', 'pelacur', 'lonte',
    'hencet', 'pantek', 'bego', 'bodoh', 'anjir', 'anjirr'
];

module.exports = async (msg) => {
    if (!msg.body) return;

    const text = msg.body.toLowerCase();

    // cek apakah mengandung kata kasar
    for (let word of BADWORDS) {
        if (text.includes(word)) {
            try {
                const chat = await msg.getChat();

                if (chat.isGroup) {
                    // cari data pengirim
                    const sender = msg.author || msg.from;

                    // cek apakah pengirim admin
                    const isAdmin = chat.participants.some(
                        p => p.id._serialized === sender && p.isAdmin
                    );

                    if (isAdmin) {
                        console.log(`[BADWORDS] Admin ngomong kasar: "${word}" → dibiarkan`);
                        return; // admin boleh
                    } else {
                        console.log(`[BADWORDS] Deteksi kata kasar: "${word}" dari ${msg.from}`);
                        await msg.reply(`⚠️ Kata *${word}* kasar banget, jangan dipakai ya 🙏`);
                    }
                } else {
                    // bukan grup, tetap kasih peringatan
                    await msg.reply(`⚠️ Kata *${word}* kasar banget, coba gunakan bahasa yang lebih sopan 🙏`);
                }
            } catch (err) {
                console.error('[BADWORDS] Error:', err);
            }
            break;
        }
    }
};
