# SFL.BYPASS — GitHub Pages frontend

Tema hitam + hijau neon, responsif untuk Android dan desktop.

## Fitur
- Validasi URL HTTP/HTTPS dan domain SFL.GL.
- Status yang jujur: tidak mengklaim redirect berhasil jika backend belum dipasang.
- Tombol salin URL, pilihan tema, dan pencatatan URL lokal di browser.
- Tidak menyimpan data di server dan tidak memalsukan hasil bypass.

## Upload ke GitHub Pages dari HP
1. Buat repository baru di GitHub, misalnya `sfl-bypass`.
2. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main`, folder `/ (root)`, lalu tekan **Save**.
6. Tunggu proses deployment selesai; alamat website tampil di bagian Pages.

## Batasan penting
GitHub Pages hanya hosting statis. Browser biasanya tidak mengizinkan JavaScript membaca header redirect dari domain lain karena CORS. Karena itu, pemeriksaan URL di paket ini belum mengurai redirect secara otomatis. Untuk resolver yang andal, tambahkan backend server-side yang memvalidasi URL, membatasi domain dan redirect, memblokir alamat IP privat/localhost untuk mencegah SSRF, serta memakai timeout dan batas redirect. Jangan gunakan untuk melewati login, CAPTCHA, pembayaran, atau kontrol akses.
