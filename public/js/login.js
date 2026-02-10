const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// TOGGLE PASSWORD 👁️
togglePassword.addEventListener('click', () => {
  passwordInput.type =
    passwordInput.type === 'password' ? 'text' : 'password';
});

// SUBMIT LOGIN
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  errorMessage.style.display = 'none';

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    errorMessage.innerText = 'Username dan password wajib diisi';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (!response.ok) {
      errorMessage.innerText = result.message || 'Login gagal';
      errorMessage.style.display = 'block';
      return;
    }

    // LOGIN BERHASIL
    window.location.href = '/dashboard.html';

  } catch (error) {
    console.error(error);
    errorMessage.innerText = 'Server error, coba lagi';
    errorMessage.style.display = 'block';
  }
});
