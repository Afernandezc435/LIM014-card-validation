import validator from './validator.js';

var input = document.getElementById("card-number");

// declaramos una variable card_types que será un arreglo de objetos con los formatos de cada tipo de tarjeta
var card_types = [{
    // Nombre de la clase en css que contiene el icono que le corresponde
    name: 'amex',
    // regex para validar si pertenece a este tipo de tarjeta
    pattern: /^3[47]/,
    // cantidad de cifras que posee este tipo de tarjeta
    valid_length: [15]
}, {
    name: 'diners_club_carte_blanche',
    pattern: /^30[0-5]/,
    valid_length: [14]
}, {
    name: 'diners_club_international',
    pattern: /^36/,
    valid_length: [14]
}, {
    name: 'jcb',
    pattern: /^35(2[89]|[3-8][0-9])/,
    valid_length: [16]
}, {
    name: 'laser',
    pattern: /^(6304|670[69]|6771)/,
    valid_length: [16, 17, 18, 19]
}, {
    name: 'visa_electron',
    pattern: /^(4026|417500|4508|4844|491(3|7))/,
    valid_length: [16]
}, {
    name: 'visa',
    pattern: /^4/,
    valid_length: [16]
}, {
    name: 'mastercard',
    pattern: /^5[1-5]/,
    valid_length: [16]
}, {
    name: 'maestro',
    pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
    valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
}, {
    name: 'discover',
    pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
    valid_length: [16]
}];

input.addEventListener('keydown', ev => {
    var card = document.getElementById("card-number-hide");
    var result = document.getElementById("result");
    var cardIcon = document.getElementById("card");
    result.className = ''

    ev.preventDefault();

    var input = "";
    // El termino "/^[0-9]+$/" es una presión Regular (regex) para determinar si un carcacter es un número o no.
    // Las expresiones regulares son patrones que se utilizan para hacer coincidir combinaciones de caracteres en cadenas.
    // En este caso solo se necesita saber si la tecla presionada esta entre los caracteres que coresponden a los números (entre 0 y 9)
    // Te utiliza el método test que recibe como parametro un string, al cual se le envia la tecla presionada         
    if (/^[0-9]+$/.test(ev.key)) {
        // Si la tecla presionada es un número se agrega al elemento card.
        card.value += ev.key;
    }
    if (ev.key == 'Backspace') {
        // Si la tecla presionada es "Backspace" (tecla de borrado) se elimina el ultimo caracter del elemento card.
        input = card.value.slice(0, -1);
        card.value = input;
    }

    input = validator.maskify(card.value)

    // Se aplica formato de tarjeta colocando un espacio despues de cada 4 caracteres ( serían en las posiciones 3, 7 y 11 )
    var formatNumber = "";
    // ciclo que recorre las posiciones del input
    // i++ es lo mismo que i = i + 1. Tambien se representa como i += 1
    for (var i = 0; i < input.length; i++) {
        if (i == 3 || i == 7 || i == 11) {
            formatNumber = formatNumber + input.charAt(i) + " "
        } else {
            formatNumber += input.charAt(i)
        }
    }
    ev.target.value = formatNumber
        //quitamos momentaneamente el tipo de tarjeta del elemento cardIcon dejando solo la clase card-type
    cardIcon.className = 'card-type'
        //recorre cada posicion del arreglo de tipos de tarjetas y verifica si cumple con el regex
    for (i = 0; i < card_types.length; i++) {
        // La condicion sería: si el valor de input (card.value) coincide con el patrón o regex
        // los strings tienen una propiedad match que es una función que devuelve si un regex coincide con dicho string
        // se le envia como parámetro a esta función el regex con que se validará
        if (card.value.match(card_types[i].pattern)) {
            //Si se cumnple la condición se agrega la clase a la caja recibida en los parámetros destinada para el icono de la tarjeta
            cardIcon.className = 'card-type ' + card_types[i].name;
        }
    }

});

document.getElementById("bbt").onclick = function() {
    var card = document.getElementById("card-number-hide");
    if (card.value == "") {
        // Si el campo de numero de tarjeta esta vacío se hace un return para no ejecutar la función isValid
        return
    }
    var result = document.getElementById("result");

    let creditCardNumber = card.value

    var isLuhn = false

    // Se llama a la función lunh donde se definió la algoritmo de Luhn y retorna true si es un numero valido y false si no lo es.
    isLuhn = validator.isValid(creditCardNumber);

    if (isLuhn == true) {
        result.className = 'card-valid'
    } else {
        result.className = 'card-error'
    }
};