const userTable = document.getElementById('userTable');
const users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = null;

// Render all users or filtered list
function renderUsers(filteredList = users) {
  userTable.innerHTML = '';
  filteredList.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.expiry}</td>
      <td>
        <button onclick="editUser(${index})" class="btn btn-warning btn-sm me-1">Edit</button>
        <button onclick="deleteUser(${index})" class="btn btn-danger btn-sm">Delete</button>
        <button onclick="viewHistory(${index})" class="btn btn-info btn-sm ms-1">History</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// Add new user
function addUser() {
  const name = document.getElementById('newName').value.trim();
  const phone = document.getElementById('newPhone').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const expiry = document.getElementById('newExpiry').value;

  if (!name || !phone || !password || !expiry) {
    alert("Please fill in all fields.");
    return;
  }

  const newUser = { name, phone, password, expiry, loginHistory: [] };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  renderUsers();

  document.getElementById('newName').value = '';
  document.getElementById('newPhone').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('newExpiry').value = '';
}

// Delete user
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
  }
}

// Edit user
function editUser(index) {
  const user = users[index];
  editIndex = index;
  document.getElementById('editName').value = user.name;
  document.getElementById('editPhone').value = user.phone;
  document.getElementById('editPassword').value = user.password;
  document.getElementById('editExpiry').value = user.expiry;
  document.getElementById('editModal').classList.remove('hidden');
}

// Save edited user
function saveUserEdit() {
  const name = document.getElementById('editName').value.trim();
  const phone = document.getElementById('editPhone').value.trim();
  const password = document.getElementById('editPassword').value.trim();
  const expiry = document.getElementById('editExpiry').value;

  if (!name || !phone || !password || !expiry) {
    alert("All fields are must required.");
    return;
  }

  users[editIndex] = { ...users[editIndex], name, phone, password, expiry };
  localStorage.setItem('users', JSON.stringify(users));
  renderUsers();
  closeEditModal();
}

// Close edit modal
//function closeEditModal() {
  //document.getElementById('editModal').classList.add('hidden');
//}

function closeEditModal() {
  const modal = document.getElementById('editModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}



// View login history
function viewHistory(index) {
  const user = users[index];
  const isOnline = JSON.parse(localStorage.getItem('loggedInUser'))?.phone === user.phone;
  const historyDiv = document.getElementById('historyContent');

  let html = `<p><strong>Name:</strong> ${user.name}</p>`;
  html += `<p><strong>Phone:</strong> ${user.phone}</p>`;
  html += `<p><strong>Status:</strong> ${isOnline ? "🟢 Online" : "⚪ Offline"}</p>`;
  html += `<p><strong>Login History:</strong></p><ul class="list-disc pl-5">`;

  if (user.loginHistory && user.loginHistory.length > 0) {
    user.loginHistory.forEach(entry => {
      html += `<li>${new Date(entry).toLocaleString()}</li>`;
    });
  } else {
    html += `<li>No login history</li>`;
  }

  html += `</ul>`;
  historyDiv.innerHTML = html;
  document.getElementById('historyModal').classList.remove('hidden');
}

// Close history modal
//function closeHistoryModal() {
 // document.getElementById('historyModal').classList.add('hidden');
//}
function closeHistoryModal() {
  const modal = document.getElementById('historyModal');
  modal.style.display = 'none';
}
// Search users
function filterUsers() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(query) || user.phone.includes(query)
  );
  renderUsers(filtered);
}

// Initial render
renderUsers();
