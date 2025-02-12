console.log("====================================");
console.log("Connected");
console.log("====================================");

// Selecting elements
const tableBody = document.getElementsByClassName("table-body")[0]; // Select first element
const totalElement = document.getElementById("total"); // Element to show total




function updateTotal() {
  let total = 0;
  const allSubtotalElements = document.querySelectorAll(".subtotal");

  allSubtotalElements.forEach((subtotalElement) => {
    let value = subtotalElement.textContent.replace("₹", "").trim(); // Remove currency symbol
    total += parseFloat(value) || 0; // Convert to number, default to 0 if NaN
  });

  // Update total in the DOM
  document.getElementById("total").textContent = `Total: ₹${total.toFixed(2)}`;
}

// Function to create a cart row
function createCart(imgUrl, title, price, quantity) {
  let tr = document.createElement("tr");

  // Image column
  let imgTd = document.createElement("td");
  let img = document.createElement("img");
  img.src = imgUrl;
  img.style.width = "50px";
  img.style.height = "50px";
  imgTd.appendChild(img);

  // Title column
  let titleTd = document.createElement("td");
  titleTd.textContent = title;

  // Price column
  let priceTd = document.createElement("td");
  priceTd.textContent = `₹${price}`;

  // Quantity column
  let quantityTd = document.createElement("td");
  quantityTd.textContent = quantity;

  // Subtotal column
  let subTotalTd = document.createElement("td");
  let subtotal = price * quantity;
  subTotalTd.textContent = `₹${subtotal}`;
  subTotalTd.classList.add("subtotal"); // Class for selecting all subtotals

  // Append all elements to the row
  tr.appendChild(imgTd);
  tr.appendChild(titleTd);
  tr.appendChild(priceTd);
  tr.appendChild(quantityTd);
  tr.appendChild(subTotalTd);

  // Append the row to the table body
  if (tableBody) {
    tableBody.appendChild(tr);
    updateTotal(); // Recalculate total after adding new item
  } else {
    console.error("table-body not found!");
  }
}




let data = [];
async function getData(url) {
  try {
    const res = await fetch(url);
    let jsonData = await res.json();
    data = jsonData;

    data?.items?.forEach((item) => {
        const {image, title, price, quantity} = item
    //   console.log(item.price,item.url,item.quantity,item.title);
    console.log(url)
    createCart(image,title,price,quantity)
    });

    console.log(data);
  } catch (error) {
    console.log(error.message);
    alert("something went wrong, Please try again latter");
  }
}

getData(
  "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
);