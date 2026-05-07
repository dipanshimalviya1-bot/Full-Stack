let customers = {};
let currentCustomer = null;

// Load data
window.onload = function () {
  let data = localStorage.getItem("khata");
  if (data) customers = JSON.parse(data);
  renderCustomers();
};

function saveData() {
  localStorage.setItem("khata", JSON.stringify(customers));
}

// Add customer
function addCustomer() {
  let name = document.getElementById("customerName").value.trim();
  if (!name) return;

  if (!customers[name]) {
    customers[name] = [];
  }

  document.getElementById("customerName").value = "";
  renderCustomers();
  saveData();
}

// Render customer list
function renderCustomers() {
  let list = document.getElementById("customerList");
  list.innerHTML = "";

  for (let name in customers) {
    let li = document.createElement("li");
    li.innerText = name;

    li.onclick = () => selectCustomer(name);

    list.appendChild(li);
  }
}

// Select customer
function selectCustomer(name) {
  currentCustomer = name;
  document.getElementById("selectedCustomer").innerText = name;
  renderHistory();
}

// Add credit
function addCredit() {
  if (!currentCustomer) return alert("Select customer");

  let amt = +document.getElementById("amount").value;
  let note = document.getElementById("note").value;

  customers[currentCustomer].push({
    amt,
    note,
    type: "credit",
    date: new Date().toLocaleString()
  });

  clearInputs();
  renderHistory();
  saveData();
}

// Add payment
function addPayment() {
  if (!currentCustomer) return alert("Select customer");

  let amt = +document.getElementById("amount").value;
  let note = document.getElementById("note").value;

  customers[currentCustomer].push({
    amt,
    note,
    type: "payment",
    date: new Date().toLocaleString()
  });

  clearInputs();
  renderHistory();
  saveData();
}

// Render history
function renderHistory() {
  let history = document.getElementById("history");
  history.innerHTML = "";

  let balance = 0;

  customers[currentCustomer].forEach(t => {
    let li = document.createElement("li");

    li.innerText = `${t.date} | ${t.type} ₹${t.amt} - ${t.note}`;

    if (t.type === "credit") balance += t.amt;
    else balance -= t.amt;

    history.appendChild(li);
  });

  document.getElementById("balance").innerText = balance;
}

// Clear inputs
function clearInputs() {
  document.getElementById("amount").value = "";
  document.getElementById("note").value = "";
}