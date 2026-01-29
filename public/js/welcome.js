document.addEventListener('DOMContentLoaded', () => {
  const btnDatang = document.getElementById('btnDatang');
  const btnPulang = document.getElementById('btnPulang');

  // 👉 nanti bisa ditambah cek session di sini
  // contoh (future):
  // fetch('/api/auth/check')

  btnDatang.addEventListener('click', () => {
    window.location.href = '/datang.html';
  });

  btnPulang.addEventListener('click', () => {
    window.location.href = '/pulang.html';
  });
});
