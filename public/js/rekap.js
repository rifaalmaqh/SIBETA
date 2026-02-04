document.addEventListener('DOMContentLoaded', () => {
  const btnFilter = document.getElementById('btnFilter');
  const startInput = document.getElementById('startDate');
  const endInput = document.getElementById('endDate');
  const tableBody = document.getElementById('rekapTable');

  btnFilter.addEventListener('click', loadRekap);

  async function loadRekap() {
    const start = startInput.value;
    const end = endInput.value;

    if (!start || !end) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="loading">Pilih tanggal mulai dan akhir</td>
        </tr>`;
      return;
    }

    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="loading">Memuat data...</td>
      </tr>`;

    try {
      const res = await fetch('http://localhost:3000/api/guest');
      const result = await res.json();

      if (!result.success || result.data.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="loading">Data tidak ditemukan</td>
          </tr>`;
        return;
      }

      const startDate = new Date(start);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);

      const filtered = result.data.filter(g => {
        const tgl = new Date(g.tanggal);
        return tgl >= startDate && tgl <= endDate;
      });

      if (filtered.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="loading">Data tidak ditemukan</td>
          </tr>`;
        return;
      }

      renderTable(filtered);

    } catch (error) {
      console.error(error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="loading">Gagal memuat data</td>
        </tr>`;
    }
  }

  function renderTable(data) {
    tableBody.innerHTML = '';

    data.forEach(g => {
      const tanggal = new Date(g.tanggal).toLocaleDateString('id-ID');

      tableBody.innerHTML += `
        <tr>
          <td>${g.nama}</td>
          <td>${g.instansi}</td>
          <td>${g.keperluan}</td>
          <td>${tanggal}</td>
          <td class="${g.status === 'Sudah Pulang' ? 'green' : 'orange'}">
            ${g.status}
          </td>
        </tr>`;
    });
  }
});