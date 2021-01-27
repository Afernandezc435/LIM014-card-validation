
import validator from './validator.js'; 

var input = document.getElementById("card-number");

input.addEventListener('keydown', ev => {
    var card = document.getElementById("card-number-hide");
    var result = document.getElementById("result");
    var cardIcon = document.getElementById("card");
    result.className = ''
    validator.maskify(ev, card, cardIcon)
});

document.getElementById("bbt").onclick = function() {
    var card = document.getElementById("card-number-hide");
    var result = document.getElementById("result");
    validator.isValid(card.value, result)
};