const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (!user) {
  window.location.href = 'index.html';
}

document.getElementById('userName').textContent = user.name;
document.getElementById('expiryDate').textContent = user.expiry;

function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}
