//--ARRAYS--
//definitions for glazing and pack options with use of objects
const glazingOptions = {
      "Keep Original": 0,
      "Sugar Milk": 0,
      "Vanilla Milk": 0.50,
      "Double-Chocolate": 1.50,
}
const packOptions = {
      "1": 1,
      "3": 3,
      "6": 5,
      "12": 10,
}


//--CLASS & OBJECTS--
//Roll class
class Roll {
      constructor (rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
      }
}

//creates Roll objects
const roll1 = new Roll("Original", "Sugar Milk", "1", 2.49);
const roll2 = new Roll("Walnut", "Vanilla Milk", "12", 3.49);
const roll3 = new Roll("Raisin", "Sugar Milk", "3", 2.99);
const roll4 = new Roll("Apple", "Keep Original", "3", 3.49);

//creates empty array
const rollCart = new Set();

//adds Roll objects to rollCart array
rollCart.add(roll1);
rollCart.add(roll2);
rollCart.add(roll3);
rollCart.add(roll4);


//--CALCULATING ROLL ITEM AND TOTAL--
//calculates price for each roll item with glazing and pack options
for (const r of rollCart) {
      
      r.calculatedPrice = (r.basePrice + glazingOptions[r.glazing]) * packOptions[r.size];
      
      //creates element
      createElement(r);
      
      //updates total price
      calculateTotal();
}

//calculates total price
function calculateTotal() {
      let total = 0;

      for (const r of rollCart) {
            total = total + r.calculatedPrice;
      }

      //roll total price
      const rollTotalPriceElement = document.querySelector('.rollTotalPrice');
      rollTotalPriceElement.innerText = '$' + String(total.toFixed(2));
}


//--CREATING & UPDATING ELEMENTS, DELETING ROLLS--
function updateElement(roll) {
      //roll image
      const rollImageElement = roll.element.querySelector('.rollImage');
      rollImageElement.src = '../assets/products/' + rolls[roll.type].imageFile;

      //roll name
      const rollNameElement = roll.element.querySelector('.rollName');
      rollNameElement.innerText = roll.type + " Cinnamon Roll";

      //roll glazing
      const rollGlazingElement = roll.element.querySelector('.rollGlazing');
      rollGlazingElement.innerText = "Glazing: " + roll.glazing;

      //roll pack size
      const rollPackElement = roll.element.querySelector('.rollPack');
      rollPackElement.innerText = "Pack Size: " + roll.size;

      //roll calculated price
      const rollCalculatedPriceElement = roll.element.querySelector('.rollCalculatedPrice');
      rollCalculatedPriceElement.innerText = '$' + String(roll.calculatedPrice.toFixed(2));
}

function createElement(roll) {
      //makes clone of roll template
      const template = document.querySelector('#rollTemplate');
      const clone = template.content.cloneNode(true);
      
      //connects clone to our roll.element
      roll.element = clone.querySelector('.rollCard');

      //creates and adds function to Remove button
      const remove = roll.element.querySelector('.remove');
      console.log(remove);
      remove.addEventListener('click', () => {
            deleteRoll(roll);
      });
      
      //adds rollList clone to the DOM
      const rollListElement = document.querySelector('.rollList');
      rollListElement.prepend(roll.element);
      
      //populates roll clone with actual roll content
      updateElement(roll);
}

function deleteRoll(roll) {
      //removes roll DOM object from the UI
      roll.element.remove();
      
      //removes actual Roll object from the set of rolls
      rollCart.delete(roll);

      //updates total price once roll item is deleted
      calculateTotal();
}
