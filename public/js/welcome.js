document.addEventListener("DOMContentLoaded", () => {
  const btnDatang = document.getElementById("btnDatang");
  const btnPulang = document.getElementById("btnPulang");
  const backBtn = document.getElementById("backDashboard");

  btnDatang.addEventListener("click", () => {
    window.location.href = "/datang.html";
  });

  btnPulang.addEventListener("click", () => {
    window.location.href = "/pulang.html";
  });

  //balik ke dashboard
  backBtn.addEventListener("click", () => {
    window.location.href = "/dashboard.html";
  });
});