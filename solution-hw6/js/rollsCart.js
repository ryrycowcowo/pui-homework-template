/*--ROLL CLASS--*/
class Roll {
      constructor (rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
      }
};


/*--CALCULATING PRICES--*/
//calculates price of each roll item
function calculatePrice(roll) {
      let glazePrice = 0;
      let packPrice = 1;

      //matches selected options to objects
      for (let x in glazingOptions) {
            if (x === roll.glazing) {
                  glazePrice = glazingOptions[x];
            }
      }
      for (let y in packOptions) {
            if (y === roll.size) {
                  packPrice = packOptions[y];
            }
      }

      return (roll.basePrice + glazePrice) * packPrice;
}

//updates total price element
function updatePriceElement(total) {
      const totalPriceElement = document.querySelector('.rollTotalPrice');
      totalPriceElement.innerHTML = '$' + Math.abs(total).toFixed(2);
}


/*--CREATING & UPDATING ELEMENTS, DELETING ROLLS--*/
function updateElement(roll) {
      //updates roll image
      const rollImageElement = roll.element.querySelector('.rollImage');
      rollImageElement.src = '../assets/products/' + rolls[roll.type].imageFile;

      //updates roll name
      const rollNameElement = roll.element.querySelector('.rollName');
      rollNameElement.innerText = roll.type + " Cinnamon Roll";

      //updates roll glazing
      const rollGlazingElement = roll.element.querySelector('.rollGlazing');
      rollGlazingElement.innerText = "Glazing: " + roll.glazing;

      //updates roll pack size
      const rollPackElement = roll.element.querySelector('.rollPack');
      rollPackElement.innerText = "Pack Size: " + roll.size;

      //updates roll item price
      const rollCalculatedPriceElement = roll.element.querySelector('.rollCalculatedPrice');
      rollCalculatedPriceElement.innerText = '$' + calculatePrice(roll).toFixed(2);

      //updates total price
      total += calculatePrice(roll);
      updatePriceElement(total);
}

function createElement(roll) {
      //makes clone of roll template
      const template = document.querySelector('#rollTemplate');
      const clone = template.content.cloneNode(true);
      
      //connects clone to our roll.element
      roll.element = clone.querySelector('.rollCard');

      //creates and adds function to Remove button
      const remove = roll.element.querySelector('.remove');
      remove.addEventListener('click', () => {
            deleteRoll(roll);
      });

      //adds rollList clone to the DOM
      const rollListElement = document.querySelector('#cart-item-list');
      rollListElement.appendChild(roll.element);

      //populates roll clone with actual roll content
      updateElement(roll);
}

function deleteRoll(roll) {
      //updates total price once roll item is deleted
      total -= calculatePrice(roll);
      updatePriceElement(total);

      //removes roll object from DOM
      roll.element.remove();
      
      //removes actual Roll object from the set of rolls
      cart.splice(cart.indexOf(roll), 1);

      //converts updated cart to JSON & saves it in local storage
      saveToLocalStorage();
}


/*--LOCAL STORAGE--*/
//saves it in local storage
function saveToLocalStorage() {     
      //converts rollCart array to JSON
      const rollCartArrayString = JSON.stringify(cart);
    
      sessionStorage.setItem('storedCartItems', rollCartArrayString);

      //prints rollCart array in local storage after saving
      console.log(rollCartArrayString);
}

//retrieves saved rollCart array from local storage
function retrieveFromLocalStorage() {
      const rollCartArrayString = sessionStorage.getItem('storedCartItems');
      const rollCartArray = JSON.parse(rollCartArrayString);
      
      for (let rollCartData of rollCartArray) {
            cart.push(rollCartData);
      }

      console.log(cart);
}


/*--CALLING FUNCTIONS--*/
//empty cart array
let cart = [];

//let total be in outer scope
let total = 0;

if (sessionStorage.getItem('storedCartItems') != null) {
      retrieveFromLocalStorage();
}

//adds roll items to cart array
for (const item of cart) {
      createElement(item);
}

//updates total price
updatePriceElement(total);
