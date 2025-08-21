module.exports = async function handleMenu(msg) {
    const menuText = `
🤖 *BOT WhatsApp Fauzan*
========================
📌 Daftar Menu:
- .tag <teks> → Mention semua anggota grup
- .sticker → Ubah gambar jadi stiker
- .gif → Ubah video jadi stiker GIF
- .toimg → Ubah stiker jadi gambar
- .menu → Tampilkan menu ini

👨‍💻 Dibuat oleh: Fauzan
    `;
    await msg.reply(menuText);
};
