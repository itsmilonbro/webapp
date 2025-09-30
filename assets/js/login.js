fetch('assets/users.json')
  .then(res => res.json())
  .then(data => localStorage.setItem('users', JSON.stringify(data)));

function login() {
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.phone === phone && u.password === password);
  if (!user) return alert("Invalid credentials");

  const today = new Date().toISOString().split('T')[0];
  if (user.expiry < today) {
    localStorage.setItem('expiredUser', JSON.stringify(user));
    return window.location.href = 'payment.html';
  }

  user.loginHistory = user.loginHistory || [];
  user.loginHistory.push(new Date().toISOString());
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  const updatedUsers = users.map(u => u.phone === user.phone ? user : u);
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  window.location.href = user.phone === "01955255066" ? "admin.html" : "dashboard.html";
    }
