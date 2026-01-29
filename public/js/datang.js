const form = document.getElementById('guestForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  console.log('KIRIM DATA:', data);

  try {
    const res = await fetch('http://localhost:3000/api/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log('RESPON SERVER:', result);

    if (!res.ok) {
      alert(result.message);
      return;
    }

    alert('BERHASIL!');
  } catch (err) {
    console.error('FETCH ERROR:', err);
    alert('Server tidak dapat dihubungi');
  }
     // setelah sukses simpan
    window.location.href = '/terimakasih.html';
});
