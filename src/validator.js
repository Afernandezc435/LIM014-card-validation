const validator = {
    maskify: function(number) {
        let input = ''
            // Si la cantidad de elementos es mayor a 4 se aplica la mascará
        if (number.length > 4) {
            // la propiedad slice se usa para generar una subcadena de un string
            // cuando el valor es negativo, indica que la posicion es esa cantidad pero contando desde derecha a izquierda
            // cuando solo se envia un parámetro al método slice este cuenta desde la posición recibida en adelante.
            // la propiedad replace de un string reemplaza un string por otro.
            // en este caso se usa replace con un regex para sustituir cualquier cosa ("/./g") por "#"
            let mascara = number.slice(0, -4)
            input = mascara.replace(/./g, "#") + number.slice(-4);
        } else {
            input = number
        }
        return input
    },

    isValid: function(number) {
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
}

export default validator;