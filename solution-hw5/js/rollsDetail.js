//--ARRAYS--
//definitions for glazing and pack options with use of objects
let glazingOptions = [
      {
            name: "Keep original",
            price: 0
      },
      {
            name: "Sugar milk",
            price: 0
      },
      {
            name: "Vanilla milk",
            price: 0.50
      },
      {
            name: "Double chocolate",
            price: 1.50
      }
]
let packOptions = [
      {
            option: 1,
            price: 1
      },
      {
            option: 3,
            price: 3
      },
      {
            option: 5,
            price: 6
      },
      {
            option: 10,
            price: 12
      },
]


//--GLAZING--
//populates glazing dropdown
const glazingDropdown = document.getElementById("glazeSelect");

for (let x = 0; x < glazingOptions.length; x++) {
      const option = document.createElement("option"); //creates option element
      option.text = glazingOptions[x].name; //sets text of of option element
      option.value = glazingOptions[x].price; //sets price values for each option
      glazingDropdown.appendChild(option);
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
      const option = document.createElement("option"); //creates option element
      option.text = packOptions[x].option; //sets text of of option element
      option.value = packOptions[x].price; //sets price values for each option
      packDropdown.appendChild(option);
}

//selects the pack dropdown & manipulates the value accordingly
function packChange(selection) {
      Product.packPrice = parseInt(selection.value); //parses selection value to integer type
      calculatePrice();
}


//--TOTAL--
//calculates total price
let total = document.getElementById("#price");

function calculatePrice() {
      let price = (Product.basePrice + Product.glazePrice) * Product.packPrice;
      total.textContent = "$" + String(price.toFixed(2)); //limits total value to 2 decimal places
}


//--ADD TO CART--
//cart array
let cart = []

//parses URL parameter
const queryString = window.location.search; //getting query string from URL
const params = new URLSearchParams(queryString); //creates URLSearchParams object
const rollType = params.get("roll"); //accesses parameter using 'get' method

//updates the header text
const headerElement = document.querySelector('.tag_line');
headerElement.innerText = rollType + ' Cinnamon Roll';

//updates the image
const cinnamonImage = document.querySelector('.detail_image');
cinnamonImage.src = '../assets/products/' + rolls[rollType].imageFile;

const priceElement = document.querySelector('#price');
priceElement.innerHTML = '$' + rolls[rollType].basePrice;

//Roll class
class Roll {
      constructor (rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing =  rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
      }
}

//default
let Product = {
      name: "Keep original",
      basePrice: rolls[rollType].basePrice,
      glazePrice: 0,
      packPrice: 1,
};

//adds items and updates cart
function addToCart() {
      let selectedGlaze = glazingDropdown.options[glazingDropdown.selectedIndex].text;
      let selectedPack = packDropdown.options[packDropdown.selectedIndex].text;
      let selectedPrice = rolls[rollType].basePrice;

      const newRoll = new Roll(rollType, selectedGlaze, selectedPack, selectedPrice);

      cart.push(newRoll);
      console.log(cart);
}
