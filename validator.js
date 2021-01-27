const validator = {
    maskify: function (e, card) {
        // Esta funcion recibe 2 parametros 
        // e: es el evento onkeyup, del cual entre los atributos tiene el "target", que es el elemento html sobre el cual ocurrió el evento
        // card: es el elemento html donde se mantendra el numero de la tarjeta sin alterar (sin sustituir los números por #)
        e.preventDefault();

        var input = "";
        // El termino "/^[0-9]+$/" es una presión Regular (regex) para determinar si un carcacter es un número o no.
        // Las expresiones regulares son patrones que se utilizan para hacer coincidir combinaciones de caracteres en cadenas.
        // En este caso solo se necesita saber si la tecla presionada esta entre los caracteres que coresponden a los números (entre 0 y 9)
        // Te utiliza el método test que recibe como parametro un string, al cual se le envia la tecla presionada         
        if (/^[0-9]+$/.test(e.key)) {
            // Si la tecla presionada es un número se agrega al elemento card.
            card.value += e.key;
        }
        if (e.key == 'Backspace') {
            // Si la tecla presionada es "Backspace" (tecla de borrado) se elimina el ultimo caracter del elemento card.
            input = card.value.slice(0, -1);
            card.value = input;
        }

        // Si la cantidad de elementos es mayor a 4 se aplica la mascará
        if (card.value.length > 4){
            // la propiedad slice se usa para generar una subcadena de un string
            // cuando el valor es negativo, indica que la posicion es esa cantidad pero contando desde derecha a izquierda
            // cuando solo se envia un parámetro al método slice este cuenta desde la posición recibida en adelante.
            // la propiedad replace de un string reemplaza un string por otro.
            // en este caso se usa replace con un regex para sustituir cualquier cosa ("/./g") por "#"
            input = card.value.slice(0, -4).replace(/./g, "#") + card.value.slice(-4);
        } else {
            input = card.value
        }
      
        // Se aplica formato de tarjeta colocando un espacio despues de cada 4 caracteres ( serían en las posiciones 3, 7 y 11 )
        var formatNumber = "";
        for (var i = 0; i < input.length; i++) {
            if (i == 3 || i == 7 || i == 11) {
                formatNumber = formatNumber + input.charAt(i) + " "
            } else {
                formatNumber += input.charAt(i)
            }
        }
        e.target.value = formatNumber
       
    },
    isValid: function (creditCardNumber) {
        var isLuhn = false

        // si el numero esta entre 12 y 16 se procede a validar el numero de tarjeta, sino, se salta este paso y el campo isLuhn queda en false.
        if (creditCardNumber.length >= 12 && creditCardNumber.length <= 16) {
            // Se llama a la función lunh donde se definió la algoritmo de Luhn y retorna true si es un numero valido y false si no lo es.
            isLuhn = luhn(creditCardNumber);
        }

        if (isLuhn == true) {
            alert("tarjeta válida");
        } else {
            alert("tarjeta incorrecta");
        }

    }
}

function luhn(number) {
    var i;

    // se invierte el arreglo
    var numberArray = number.split('').reverse();

    // se recorren las posiciones del arreglo
    for (i = 0; i < numberArray.length; i++) {
        if (i % 2 != 0) {
            // si es un nuúmero par se multiplica por 2
            numberArray[i] = numberArray[i] * 2;
            if (numberArray[i] > 9) {
                // si despues de multiplicarlo el resultado es mayor a nueve se suman sus cifras y se sustituye esa posicion por este nuevo valor
                numberArray[i] = parseInt(String(numberArray[i]).charAt(0)) + parseInt(String(numberArray[i]).charAt(1));
            }
        }
    }
    var sum = 0;

    // se recorre nuevamente el arreglo para sumar cada cifra en la variable sum
    for (i = 1; i < numberArray.length; i++) {
        sum += parseInt(numberArray[i]);
    }
    
    // si el resultado es un múltiplo de 10 es una tarjeta válida, de lo contrario es incorrecta.
    sum = sum * 9 % 10;
    if (numberArray[0] == sum) {
        return true;
    } else {
        return false;
    }
}

export default validator;
