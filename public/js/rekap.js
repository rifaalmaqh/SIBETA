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
        const res = await fetch(
          `/api/guest/rekap?start=${start}&end=${end}`
        );
        const result = await res.json();
  
        if (!result.success || result.data.length === 0) {
          tableBody.innerHTML = `
            <tr>
              <td colspan="5" class="loading">Data tidak ditemukan</td>
            </tr>`;
          return;
        }
  
        renderTable(result.data);
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
  