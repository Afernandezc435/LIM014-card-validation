import validator from './validator.js';

var input = document.getElementById("card-number");

input.addEventListener('keydown', ev => {
    var card = document.getElementById("card-number-hide");
    var result = document.getElementById("result");
    var cardIcon = document.getElementById("card");
    result.className = ''

    // se llama a la funcviónmaskify y se le pasa el evento (ev), el elemento donde esta el númer de la tarjeta y el elemento donde va el icono del tipo de tarjeta
    validator.maskify(ev, card, cardIcon)
});

document.getElementById("bbt").onclick = function() {
    var card = document.getElementById("card-number-hide");
    if (card.value == "") {
        // Si el campo de numero de tarjeta esta vacío se hace un return para no ejecutar la función isValid
        return
    }
    var result = document.getElementById("result");
    // Se llama a la funcion isValid y se envia el número de la tarjeta y el elemento donde colocara el icono de resultado
    validator.isValid(card.value, result)
};