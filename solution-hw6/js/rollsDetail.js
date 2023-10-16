/*--ROLL CLASS--*/
class Roll {
      constructor (rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing =  rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
      }
};


/*--DROPDOWNS--*/
//selects the glazing dropdown & manipulates the value accordingly
function glazingChange(selection) {
      bun.glazing = selectGlazing.options[selectGlazing.selectedIndex].text;
      displayPrice(calculatePrice());
}

//selects the pack dropdown & manipulates the value accordingly
function packChange(selection) {
      bun.size = selectPacksize.options[selectPacksize.selectedIndex].text;
      displayPrice(calculatePrice());
}


/*--CALCULATES & DISPLAYS PRICES--*/
//calculates price of each roll item
function calculatePrice() {
      let glazePrice = 0;
      let packPrice = 1;

      //matches selected options to objects
      for (let x in glazingOptions) {
            if (x === bun.glazing) {
                  glazePrice = glazingOptions[x];
            }
      }
      for (let y in packOptions) {
            if (y === bun.size) {
                  packPrice = packOptions[y];
            }
      }

      return (bun.basePrice + glazePrice) * packPrice;
}

//displays price
function displayPrice(price) {
      let itemPrice = document.querySelector('#price');
      itemPrice.innerText = '$' + price.toFixed(2);
}


/*--ADD TO CART--*/
//adds items and updates cart
function addToCart() {
      //Roll instance
      const newRoll = new Roll(bun.type, bun.glazing, bun.size, bun.basePrice);

      //adds instance to cart array
      cart.push(newRoll);
      console.log(cart);

      //converts updated cart to JSON & saves it in local storage
      saveToLocalStorage();
}


//--LOCAL STORAGE--
//saves it in local storage
function saveToLocalStorage() {
      //converts cart array to JSON
      const cartArrayString = JSON.stringify(cart);

      sessionStorage.setItem('storedCartItems', cartArrayString);

      //prints cart array in local storage after saving
      console.log(cartArrayString);
      console.log(cart);
}

//retrieves saved cart array from local storage
function retrieveFromLocalStorage() {
      const cartArrayString = sessionStorage.getItem('storedCartItems');
      const cartArray = JSON.parse(cartArrayString);

      for (let cartData of cartArray) {
            cart.push(cartData);
      }

      console.log(cart);
      console.log(cartArrayString);
}


/*--GLAZING--*/
//populates glazing dropdown
const glazingDropdown = document.getElementById("glazeSelect");

for (let item in glazingOptions) {
      const option = document.createElement("option"); //creates option element
      option.text = item; //sets text of of option element
      option.value = glazingOptions[item]; //sets price values for each option
      glazingDropdown.appendChild(option);
}


/*--PACKING SIZE--*/
//populates packing size dropdown
const packDropdown = document.getElementById("packSelect");

for (let item in packOptions) {
      const option = document.createElement("option"); //creates option element
      option.text = item; //sets text of of option element
      option.value = packOptions[item]; //sets price values for each option
      packDropdown.appendChild(option);
}


/*--UPDATES ELEMENTS--*/
//parses URL parameter
const queryString = window.location.search; //getting query string from URL
const params = new URLSearchParams(queryString); //creates URLSearchParams object
const rollType = params.get("roll"); //accesses parameter using 'get' method

//updates the header text
const headerElement = document.querySelector('.tag_line');
headerElement.innerText = rollType + ' Cinnamon Roll';

//updates the image
const rollImage = document.querySelector('.detail_image');
rollImage.src = '../assets/products/' + rolls[rollType].imageFile;

//updates the price
const priceElement = document.querySelector('#price');
priceElement.innerHTML = '$' + rolls[rollType].basePrice;


/*--ADDEVENTLISTENER TO DROPDOWNS & BUTTON--*/
let selectGlazing = document.querySelector("#glazeSelect");
let selectPacksize = document.querySelector("#packSelect");
let cartButton = document.querySelector('#cart-button');

selectGlazing.addEventListener('change', glazingChange);
selectPacksize.addEventListener('change', packChange);
cartButton.addEventListener('click', addToCart);


/*--INITIALIZATION--*/
//empty cart array
let cart = [];

//default Roll instance
let bun = new Roll(rollType, 'Keep original', '1', rolls[rollType].basePrice)

if (sessionStorage.getItem('storedCartItems') != null) {
      retrieveFromLocalStorage();
}
