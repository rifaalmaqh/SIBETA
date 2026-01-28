async function loadDashboard() {
  const res = await fetch('/api/guest/today');
  const data = await res.json();

  const table = document.getElementById('guestTable');
  table.innerHTML = '';

  let belumPulang = 0;
  let sudahPulang = 0;

  data.forEach(g => {
    const status = g.pulangAt ? 'Pulang' : 'Datang';

    if (g.pulangAt) sudahPulang++;
    else belumPulang++;

    table.innerHTML += `
      <tr>
        <td>${g.name}</td>
        <td>${g.institution || '-'}</td>
        <td>${g.purpose}</td>
        <td class="${status === 'Pulang' ? 'done' : 'ongoing'}">
          ${status}
        </td>
      </tr>
    `;
  });

  document.getElementById('totalToday').innerText = data.length;
  document.getElementById('belumPulang').innerText = belumPulang;
  document.getElementById('sudahPulang').innerText = sudahPulang;
}

document.addEventListener('DOMContentLoaded', loadDashboard);
