
import validator from './validator.js'; 

var input = document.getElementById("card-number");

input.addEventListener('keydown', ev => {
    var card = document.getElementById("card-number-hide");
    validator.maskify(ev, card)
});

document.getElementById("bbt").onclick = function() {
    var card = document.getElementById("card-number-hide");
    validator.isValid(card.value)
};