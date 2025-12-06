const params = new URLSearchParams(window.location.search);
const user = params.get("user");

if (!user) {
  alert("No user selected");
  window.location.href = "index.html";
}

document.getElementById("userTitle").textContent = user;

const list = document.getElementById("expenseList");
const totalEl = document.getElementById("totalAmount");
const form = document.getElementById("expenseForm");

function render() {
  const data = getData();
  const expenses = data.users[user] || [];

  list.innerHTML = "";
  let total = 0;

  expenses.forEach((e, i) => {
    total += e.amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.name}</td>
      <td>₹${e.amount}</td>
      <td>${e.date}</td>
      <td>
        <button onclick="removeExpense(${i})">✕</button>
      </td>
    `;
    list.appendChild(row);
  });

  totalEl.textContent = total.toFixed(2);
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = getData();
  data.users[user] = data.users[user] || [];

  data.users[user].push({
    name: expenseName.value,
    amount: Number(expenseAmount.value),
    date: expenseDate.value
  });

  saveData(data);
  form.reset();
  render();
});

function removeExpense(index) {
  const data = getData();
  data.users[user].splice(index, 1);
  saveData(data);
  render();
}

render();
