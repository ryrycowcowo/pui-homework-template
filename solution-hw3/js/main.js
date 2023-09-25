//--ARRAYS--
//definitions for glazing and pack options
let glazingOptions = [
      "Keep original",
      "Sugar milk",
      "Vanilla milk",
      "Double chocolate"
]
let glazingPrices = [
      0,
      0,
      0.50,
      1.50
]
let packOptions = [
      1,
      3,
      6,
      12
]
let packPrices = [
      1,
      3,
      5,
      10
]

//default
let Product = {
      name: "Keep original",
      basePrice: 2.49,
      glazePrice: 0,
      packPrice: 1,
};


//--GLAZING--
//populates glazing dropdown
const glazingDropdown = document.getElementById("glazeSelect");

for (let x = 0; x < glazingOptions.length; x++) {
      const options = document.createElement("option"); //creates option element
      options.textContent = glazingOptions[x]; //sets text of of option element
      options.value = glazingPrices[x]; //sets price values for each option

      glazingDropdown.appendChild(options);
}

//selects the glazing dropdown & manipulates the value accordingly
function glazingChange(selection) {
      Product.glazePrice = parseFloat(selection.value); //parses selection value to float type
      calculatePrice();
}


//--PACK--
//populates pack dropdown
const packDropdown = document.getElementById("packSelect");

for (let x = 0; x < packOptions.length; x++) {
      const options = document.createElement("option"); //creates option element
      options.text = packOptions[x]; //sets text of of option element
      options.value = packPrices[x]; //sets price values for each option

      packDropdown.appendChild(options);
}

//selects the pack dropdown & manipulates the value accordingly
function packChange(selection) {
      Product.packPrice = parseInt(selection.value); //parses selection value to integer type
      calculatePrice();
}


//--TOTAL--
//calculates total price
let total = document.getElementById("price");

function calculatePrice() {
      let price = (Product.basePrice + Product.glazePrice) * Product.packPrice;
      total.textContent = "$" + String(price.toFixed(2)); //limits total value to 2 decimal places
}

