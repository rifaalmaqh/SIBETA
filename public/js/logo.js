document.addEventListener("DOMContentLoaded", function () {
  const logoContainer = document.createElement("div");
  logoContainer.className = "top-logos";

  logoContainer.innerHTML = `
    <img src="assets/logo_smkn1.png" alt="SMKN1 Logo">
    <img src="assets/logo_sija.png" alt="SIJA Logo">
  `;

  document.body.appendChild(logoContainer);
});
