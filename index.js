const userList = document.getElementById("userList");
const addBtn = document.getElementById("addUserBtn");
const input = document.getElementById("userNameInput");

function loadUsers() {
  const data = getData();
  userList.innerHTML = "";

  Object.keys(data.users).forEach(name => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = name;
    div.onclick = () => {
      window.location.href = `tracker.html?user=${encodeURIComponent(name)}`;
    };
    userList.appendChild(div);
  });
}

addBtn.onclick = () => {
  const name = input.value.trim();
  if (!name) return;

  const data = getData();
  if (!data.users[name]) {
    data.users[name] = [];
    saveData(data);
  }

  input.value = "";
  loadUsers();
};

loadUsers();
