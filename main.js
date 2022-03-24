// Get Elements
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const tbody = document.querySelector(".tbody");
// Get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Create
// &
// Save To localStorage
let dataPro;
if (localStorage.Product != null) {
  dataPro = JSON.parse(localStorage.Product);
} else {
  dataPro = [];
}

submit.addEventListener("click", () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  localStorage.setItem("Product", JSON.stringify(dataPro));

  if (newPro.count > 1) {
    for (let i = 0; i < newPro.count; i++) {
      dataPro.push(newPro);
    }
  } else {
    dataPro.push(newPro);
  }
  clearData();
  showData();
});

// Clear Inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// Read
if (localStorage.Product != null) {
  showData();
}
function showData() {
  let table = ``;
  for (let i = 0; i < dataPro.length; i++) {
    // let index = i + 1;
    table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
  `;
  }
  document.querySelector(`#tbody`).innerHTML = table;
  window.onload = function () {
    table = dataPro;
  };

  let deleteBtn = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteBtn.innerHTML = `<button onclick="deleteAll()">(${dataPro.length}) حذف الكل</button>`;
  } else {
    deleteBtn.innerHTML = "";
  }
}

// Delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.Product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// Count
// Update
// Search
// Clean Data
