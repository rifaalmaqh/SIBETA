const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const btnFilter = document.getElementById('btnFilter');
const tableBody = document.getElementById('rekapTable');

btnFilter.addEventListener('click', async () => {
  const start = startDateInput.value;
  const end = endDateInput.value;

  if (!start || !end) {
    alert('Pilih tanggal mulai dan akhir');
    return;
  }

  tableBody.innerHTML = `
    <tr>
      <td colspan="7">Memuat data...</td>
    </tr>
  `;

  try {
    const res = await fetch(`/api/guests/rekap?start=${start}&end=${end}`);
    const result = await res.json();

    renderTable(result.data);
  } catch (err) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7">Gagal memuat data</td>
      </tr>
    `;
  }
});

function renderTable(data) {
  tableBody.innerHTML = '';

  if (!data || data.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7">Data tidak ditemukan</td>
      </tr>
    `;
    return;
  }

  data.forEach(g => {
    tableBody.innerHTML += `
      <tr>
        <td>${g.nama}</td>
        <td>${g.instansi}</td>
        <td>${g.keperluan}</td>
        <td>${formatTanggal(g.tanggal)}</td>
        <td>${formatJam(g.jamDatang)}</td>
        <td>${g.jamPulang ? formatJam(g.jamPulang) : '-'}</td>
        <td>
          <span class="status ${g.status === 'Sudah Pulang' ? 'done' : 'pending'}">
            ${g.status}
          </span>
        </td>
      </tr>
    `;
  });
}

function formatTanggal(date) {
  return new Date(date).toLocaleDateString('id-ID');
}

function formatJam(date) {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
