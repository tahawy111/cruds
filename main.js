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

let mood = "create";
let tmp;

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

  // Count
  if (title.value != "" && price.value != "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      count.style.display = "block";
    }
  } else {
    alert("ممنوع انشاء منتج بدون اسم وسعر");
  }
  localStorage.setItem("Product", JSON.stringify(dataPro));

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
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
            </tr>
            `;
  }
  document.querySelector(`#tbody`).innerHTML = table;
  window.onload = function () {
    table = dataPro;
  };

  let deleteBtn = document.getElementById("deleteAll");

  if (dataPro.length > 0) {
    deleteBtn.innerHTML = `<button disabled onclick="deleteAll()">حذف الكل</button>`;
  } else {
    deleteBtn.innerHTML = "";
  }
  getTotal();
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

// Delete all toggle function
let indicatorContainer = document.querySelector(".indicator-container");
let indicator = document.querySelector(".indicator");
let deleteBtn = document.getElementById("deleteAll");
indicator.addEventListener("click", () => {
  deleteBtn.querySelector("button").toggleAttribute("disabled");
  indicatorContainer.classList.toggle("active");
});

// Update
function updateData(i) {
  // Fill The input with product Data.
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.value = dataPro[i].count;
  category.value = dataPro[i].category;
  // total.innerHTML = dataPro[i].total;
  // Update Submit Name From (انشاء) to (تحديث)
  submit.innerHTML = "تحديث";
  // To enable getTotal() Function
  count.style.display = "none";
  getTotal();
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "البحث بالاسم";
  } else if (id == "searchCategory") {
    searchMood = "category";
    search.placeholder = "البحث بالفئة";
  } else {
    searchMood = "price";
    search.placeholder = "البحث بالفئة";
  }
  search.focus();
  search.value = "";
}
function searchData(value) {
  let table = ``;
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
            </tr>
            `;
      }
    }
  } else if (searchMood == "category") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
            </tr>
            `;
      }
    }
  } else {
    if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
      table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
            </tr>
            `;
    }
  }
  showData();

  document.querySelector(`#tbody`).innerHTML = table;
}
// Clean Data
