const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const btnFilter = document.getElementById("btnFilter");
const tableBody = document.getElementById("rekapTable");

btnFilter.addEventListener("click", async () => {
  const start = startDateInput.value;
  const end = endDateInput.value;

  if (!start || !end) {
    alert("Pilih tanggal mulai dan akhir");
    return;
  }

  tableBody.innerHTML = `
    <tr>
      <td colspan="8">Memuat data...</td>
    </tr>
  `;

  try {
    const res = await fetch(`/api/guests/rekap?start=${start}&end=${end}`);
    const result = await res.json();

    renderTable(result.data);
  } catch (err) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8">Gagal memuat data</td>
      </tr>
    `;
  }
});

function renderTable(data) {
  tableBody.innerHTML = "";

  if (!data || data.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8">Data tidak ditemukan</td>
      </tr>
    `;
    return;
  }

  data.forEach((g) => {
    const statusClass = g.status === "Sudah Pulang" ? "green" : "orange";

    tableBody.innerHTML += `
      <tr>
        <td>${g.nama || "-"}</td>
        <td>${g.instansi || "-"}</td>
        <td>${g.keperluan || "-"}</td>
        <td>${g.tanggal ? formatTanggal(g.tanggal) : "-"}</td>
        <td>${g.jamDatang ? formatJam(g.jamDatang) : "-"}</td>
        <td>${g.jamPulang ? formatJam(g.jamPulang) : "-"}</td>
        <td class="${statusClass}">
          ${g.status || "-"}
        </td>
        <td>
          <button class="btn-delete" onclick="deleteGuest('${g._id}')">
            Hapus
          </button>
        </td>
      </tr>
    `;
  });
}

/* =========================
   DELETE (GLOBAL FUNCTION)
========================= */
window.deleteGuest = async function (id) {
  const confirmDelete = confirm("Yakin ingin menghapus data ini?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/guests/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Gagal menghapus data");
      return;
    }

    alert("Data berhasil dihapus");

    // Refresh tabel
    btnFilter.click();
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat menghapus");
  }
};

function formatTanggal(date) {
  return new Date(date).toLocaleDateString("id-ID");
}

function formatJam(date) {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
