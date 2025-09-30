const expiredUser = JSON.parse(localStorage.getItem('expiredUser'));
if (!expiredUser) {
  window.location.href = 'index.html';
}

document.getElementById('expiredName').textContent = expiredUser.name;
document.getElementById('expiredDate').textContent = expiredUser.expiry;
