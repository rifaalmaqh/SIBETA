const socket = io({
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

async function loadDashboard() {
  try {
    const res = await fetch('/api/guests/today');
    if (!res.ok) throw new Error('Gagal fetch data dashboard');

    const result = await res.json();
    updateDashboard(result.data);

  } catch (err) {
    console.error(err);
  }
}

function updateDashboard(data) {
  // ===== CARD =====
  document.getElementById('totalTamu').textContent = data.length;

  const pulang = data.filter(g => g.status === 'Sudah Pulang').length;
  const belum = data.filter(g => g.status === 'Belum Pulang').length;

  document.getElementById('pulang').textContent = pulang;
  document.getElementById('belum').textContent = belum;

  // ===== TABLE =====
  const tbody = document.getElementById('guestTable');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="loading">Belum ada data hari ini</td>
      </tr>
    `;
    return;
  }

  data.forEach(g => {
    tbody.innerHTML += `
      <tr>
        <td>${g.nama}</td>
        <td>${g.instansi}</td>
        <td>${g.keperluan}</td>
        <td class="${g.status === 'Sudah Pulang' ? 'green' : 'red'}">
          ${g.status}
        </td>
      </tr>
    `;
  });
}

// LOAD AWAL
loadDashboard();

// REAL-TIME LISTENER - Ganti setInterval dengan Socket.io
socket.on('guest:created', () => {
  console.log('📢 Ada tamu baru!');
  loadDashboard();
});

socket.on('guest:updated', () => {
  console.log('✏️ Status tamu diperbarui!');
  loadDashboard();
});

socket.on('connect', () => {
  console.log('✅ Terhubung ke server (Socket.io)');
});

socket.on('disconnect', () => {
  console.log('❌ Terputus dari server');
});
