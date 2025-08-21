// commands/menu.js
module.exports = async function handleMenu(msg) {
    const menuText = `
╔═══ 🌟 *BOT WhatsApp Fauzan* 🌟 ═══╗

📌 *Daftar Fitur Utama:*
───────────────────────────────
🔹 *.tag <teks>*  
   ➝ Mention semua anggota grup  

🔹 *.sticker*  
   ➝ Ubah gambar jadi stiker (support reply)  

🔹 *.sticker <pack|author>*  
   ➝ Buat stiker dengan nama & author custom  

🔹 *.gif*  
   ➝ Ubah video jadi stiker GIF  

🔹 *.toimg*  
   ➝ Ubah stiker jadi gambar  

🔹 *.kalenderakademik*  
   ➝ Lihat Kalender Akademik 2025/2026  

🔹 *.menu*  
   ➝ Tampilkan menu ini lagi  

───────────────────────────────
⚠️ *Auto Filter Kata Kasar:*  
Bot akan menegur jika ada kata tidak sopan  

👨‍💻 *Dibuat oleh:* Fauzan
╚═════════════════════════════╝
    `;
    await msg.reply(menuText);
};