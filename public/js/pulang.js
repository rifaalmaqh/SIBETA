const searchInput = document.getElementById('searchNama');
const tableBody = document.getElementById('guestTableBody');

let allGuests = [];

// ===============================
// LOAD DATA TAMU HARI INI
// ===============================
async function loadGuests() {
  try {
    const res = await fetch('/api/guests/today');
    if (!res.ok) throw new Error('Gagal fetch data');

    const result = await res.json();

    allGuests = result.data;

    renderTable(allGuests);
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">Gagal memuat data</td>
      </tr>
    `;
  }
}

// ===============================
// RENDER TABEL
// ===============================
function renderTable(data) {
  tableBody.innerHTML = '';

  if (!data || data.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">Data tidak ditemukan</td>
      </tr>
    `;
    return;
  }

  data.forEach((guest, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${guest.nama}</td>
        <td>${guest.instansi || '-'}</td>
        <td>
          <span class="status ${guest.status === 'Sudah Pulang' ? 'done' : 'pending'}">
            ${guest.status}
          </span>
        </td>
        <td>
          ${
            guest.status === 'Belum Pulang'
              ? `<button class="btn-action" onclick="setPulang('${guest._id}')">✔ Pulang</button>`
              : '✔'
          }
        </td>
      </tr>
    `;
  });
}

// ===============================
// SEARCH REALTIME
// ===============================
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = allGuests.filter(g =>
    g.nama.toLowerCase().includes(keyword)
  );

  renderTable(filtered);
});

// ===============================
// SET TAMU PULANG
// ===============================
async function setPulang(id) {
  const yakin = confirm('Yakin tandai tamu sudah pulang?');
  if (!yakin) return;

  try {
    const res = await fetch(`/api/guests/${id}/pulang`, {
      method: 'PUT'
    });

    if (!res.ok) throw new Error('Gagal update');

    alert('Status berhasil diupdate');
    loadGuests();
  } catch (err) {
    alert('Gagal mengupdate status');
  }
}

// LOAD AWAL
loadGuests();
