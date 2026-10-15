const form = document.getElementById('resolverForm');
const input = document.getElementById('urlInput');
const result = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const resultLink = document.getElementById('resultLink');
const submitBtn = document.getElementById('submitBtn');
let copyValue = '';

function showResult(title, message, link = '') {
  result.classList.remove('hidden');
  resultTitle.textContent = title;
  resultMessage.textContent = message;
  copyValue = link;
  if (link) {
    resultLink.href = link;
    resultLink.textContent = link;
    resultLink.classList.remove('hidden');
  } else {
    resultLink.removeAttribute('href');
    resultLink.textContent = '';
    resultLink.classList.add('hidden');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let url;
  try {
    url = new URL(input.value.trim());
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocol');
  } catch {
    showResult('URL tidak valid', 'Masukkan URL lengkap yang diawali https:// atau http://.');
    return;
  }
  if (url.hostname !== 'sfl.gl' && !url.hostname.endsWith('.sfl.gl')) {
    showResult('Periksa domain', 'URL ini bukan domain sfl.gl. Kamu tetap bisa membuka tautan secara manual setelah memastikan sumbernya aman.', url.href);
    return;
  }
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Memeriksa…';
  // GitHub Pages cannot reliably read cross-origin redirect headers due to browser CORS.
  // Do not pretend that a redirect was resolved if no backend is configured.
  await new Promise(resolve => setTimeout(resolve, 450));
  showResult('Frontend siap — backend diperlukan', 'URL berhasil divalidasi, tetapi GitHub Pages tidak dapat membaca redirect lintas-domain secara andal. Pasang backend resolver milikmu untuk mendapatkan URL tujuan. Tidak ada hasil bypass palsu yang ditampilkan.', url.href);
  submitBtn.disabled = false;
  submitBtn.querySelector('span').textContent = 'Periksa URL';
  try {
    const history = JSON.parse(localStorage.getItem('sflHistory') || '[]');
    history.unshift({url: url.href, at: new Date().toISOString()});
    localStorage.setItem('sflHistory', JSON.stringify(history.slice(0, 10)));
  } catch {}
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  if (!copyValue) {
    resultMessage.textContent = 'Belum ada URL untuk disalin.';
    return;
  }
  try {
    await navigator.clipboard.writeText(copyValue);
    document.getElementById('copyBtn').textContent = 'Tersalin ✓';
    setTimeout(() => document.getElementById('copyBtn').textContent = 'Salin URL', 1400);
  } catch {
    resultMessage.textContent = 'Clipboard tidak tersedia di browser ini. Tekan lama URL untuk menyalinnya.';
  }
});

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('sflTheme', document.body.classList.contains('light') ? 'light' : 'dark');
});
if (localStorage.getItem('sflTheme') === 'light') document.body.classList.add('light');
