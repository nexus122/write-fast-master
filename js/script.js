// Estado de la APP
let STATE = {
    currentWord: "", // Aquí debemos guardar el resultado de getNextWord()
    currentProgressWord: 0, // indica cual es la siguiente posición del "currentWord" a procesar
    ranking: [],
    // Si le pasas una letra, te dice si esa letra va justamente en la posición 'currentProgressWord'
    isCorrectLetter: function (inputLetter) {
        return this.currentWord[STATE.currentProgressWord] == inputLetter;
    },
    // Nos indica si hemos escrito ya toda la letra
    isWordFinished: function () {
        return this.currentProgressWord == this.currentWord.length;
    },
    generateNextWord: function () {
        // Intento de aplicar una animación cuando aparece un elemento  
        document.querySelector("#next-word").classList.remove("w3-animate-left");
        document.querySelector("#next-word").classList.add("w3-animate-left");

        // Buscamos y escribimos la siguiente palabra
        STATE.currentWord = getNextWord();
        document.querySelector("#next-word").innerHTML = STATE.currentWord;
    },
    generateRanking: function (palabra, tiempo) {
        // Guardamos los datos en un array de arrays de STATE
        this.ranking.push([palabra, tiempo]);

        // Generamos una variable temporal donde guardaremos los tiempos
        let temp = "";
        // Recorremos el array de palabras y tiempos
        this.ranking.forEach(record => {
            // Generamos una linea de tablas para cada resultado
            temp += `<tr><td>${record[0]}</td><td>${(record[1] / 60 / 60).toFixed(2)}</td></tr>`;
        })

        // Machacamos la información antigua escribiendo ademas la nueva
        document.querySelector("#resultado tbody").innerHTML = temp;
    }
}

// Paso 1: al hacer click en el botón empezar, obtener la primera palabra a procesar. (console.log) Debemos también ocultar el botón de empezar y mostrar el contenedor con la palabra a escribir.


// Al hacer clic en EMPEZAR-->

// Requisito 1: Ocultar el botón "Empezar"

// Requisito 2: Mostrar el contenedor con id="next-word-card"

// Requisito 3: Actualizar STATE.currentWord con el valor que devuelve getNextWord()

// Requisito 4. Actualizar la propiedad .textContent de id="next-word" con el valor de STATE.currentWord

let button = document.querySelector("#start-game button");

button.addEventListener("click", function () {

    // button.style.display = "none";
    button.classList.add("w3-hide");

    document.querySelector("#next-word-card").classList.remove("w3-hide");
    // Primera actualización de estado.
    STATE.generateNextWord();
    Watch.startWatch();
})


// PASO 2: Escuchar el teclado

// ✔️ Requisito 1: Añadir un listener para detectar las letras introducidas por el usuario (solo letras). Mostrar por console.log

// ✔️ Creamos un span en verde donde guardar las letras correctas
// ✔️ Requisito 2: Cada vez que el usuario pulsa una tecla:
// ✔️ A. Ver si la tecla pulsada, es la que toca: STATE.isCorrectLetter(teclaPulsadaPorElUsuario). Si NO es la que toca, terminar la función inmediatamente

// ✔️ B. Su ha escrito correctamente la letra que toca
// ✔️ 1. Actualizar +1 la variable STATE.currentProgressWord
// ✔️ 2. Comprobar si ya hemos terminado la palanbra con STATE.isWordFinished
// ✔️ 3. Actualizar la UX. Os ayudará el método substring o slice. Podeis usar <span> para este cometido; partiendo la STATE.currentWord por el índice de currentProgressWord https://oscarm.tinytake.com/msc/NjYyMTUyOF8xOTE2NDI1NQ

document.addEventListener('keydown', (event) => {
    if (!STATE.isCorrectLetter(event.key)) {// Si no es la letra correcta acabamos
        return false;
    }
    // Sumamos una al currentProgressWord para la siguiente tecla.
    STATE.currentProgressWord = STATE.currentProgressWord + 1;

    // Nos quedamos con la parte de la palabra correcta.
    let letrasCorrectas = STATE.currentWord.substring(0, STATE.currentProgressWord)
    let letrasIncorrectas = STATE.currentWord.substring(STATE.currentProgressWord, STATE.currentWord.length);

    // Actualizamos el DOM con la respuesta.
    document.querySelector("#next-word").innerHTML = `<span class="correct">${letrasCorrectas}</span>${letrasIncorrectas}`

    // Comprobamos si hemos acabado de escribir la palabra de forma correcta.
    if (STATE.isWordFinished()) {
        // Generamos un Ranking al haber acabado enviando la palabra actual y el numero en milisegundos        
        STATE.generateRanking(STATE.currentWord, Watch.stopWatch());
        // Volvemos a colocar el numero que cuenta las letras correctas a 0
        STATE.currentProgressWord = 0;

        // Generamos una nueva palabra
        STATE.generateNextWord();

        // Volvemos a empezar el tiempo ya que generamos una nueva palabra
        Watch.startWatch();
    }
})









