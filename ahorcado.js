// Definos las variablees del ejercicio

let words = [['ordenador'], ['videojuego'], ['javascript'], ['ironhack'], ['css'], ['bootcamp'], ['html'], ['madrid'], ['paris'], ['barcelona'], ['amsterdam'], ['berlin'], ['lisboa'], ['mexico']];
let word = '';
let hidden_letter = [];
let letter_space = document.getElementById("word");
let count = 6;
let count_fails = 1;
let cronometro;


/*Esta función lo que hace es de la array words elegir una de manera aleatoria, por eso use el método math.random y como no queremos decimales usé toFixed */ 

function generateWord() {
    let total_words = words.length - 1;
    rand = (Math.random() * total_words).toFixed(0);
    word = words[rand][0].toUpperCase()

}
// -----------------------------------------------------

// Se pasa como parametro la longitud de la palabra escogida en la anterior función
// y se pintan los guiones necesarios que se mostraran en pantalla
function generateDash(num) {
    letter_space = document.getElementById("word");
    for (let i = 0; i < num; i++) {
      hidden_letter[i] = "_";
    }
    letter_space.innerHTML = hidden_letter.join("");

}

/*Creamos con un bucle for para crear los botones con la función de JS charcodeAt. Los botones a su vez llaman a la función try_letter*/
 
function generateButtons (a,z) {
    let i = a.charCodeAt(0), j = z.charCodeAt(0);
    let letter = '';

    for( ; i<=j; i++) {
        letter = String.fromCharCode(i).toUpperCase();
        document.getElementById("buttons").innerHTML += "<button value='" + letter + "' onclick='try_letter(\"" + letter + "\")' class='letter' id='"+letter+"'>" + letter + "</button>";
    }

}


/* Esta función es llamada desde que le pasamos la letra de la función anterior, y le quita la clase. Luego comprobamos si hemos acertado o no y se colocará la letra si hemos acertado y si se falla, coloca imagen.
Al final llama a la función check.
*/

function try_letter(letter) {
    document.getElementById(letter).disabled = true;
    document.getElementById(letter).classList.remove("letter");
    
    if(word.indexOf(letter) != -1) {
        for(let i=0; i<word.length; i++) {
            if(word[i]==letter) hidden_letter[i] = letter;
        }
        letter_space.innerHTML = hidden_letter.join("");
        document.getElementById(letter).classList.add("letter-correct");
    }
    else {
        count--;
        count_fails++;
        document.getElementById(letter).classList.add("letter-incorrect");
        document.getElementById('try').innerHTML = count;
        document.getElementById("image").src = './images/hangman_'+count_fails+'.jpg';
    }

    check();

}


// Esta función verifica si la palabra está completa y muestra si ha ganado o no
function check() {
    if (count == 0) {
        document.getElementById('buttons').innerHTML = "<button onclick='location.reload()'>¿Probamos de nuevo?</button>";
        stop();
    }
    else if (hidden_letter.indexOf("_") == -1 ) {
        document.getElementById("image").src = './images/hangman_win.jpg';
        document.getElementById('buttons').innerHTML = "<button onclick='location.reload()' >¿Probamos de nuevo?</button>";
        stop();
        win();
    }

}

function win() {
    document.getElementById("img").innerHTML='<img src="./images/win1.jpg">';
}

/* Estas funciones se han creado para crear el contador y luego se llamará a la de stop cuando haya ganado o perdido para que se resetee*/

function stop (){
    clearInterval(cronometro);

}

function time(){

    contador_s = 0;
    contador_m = 0;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");

   cronometro = setInterval(
        function(){
            if (contador_s == 60){
                contador_s = 0;
                contador_m++;
                m.innerHTML = contador_m;

                if (contador_m == 0){
                    contador_m = 0;
                }
            }

            s.innerHTML = contador_s;
            contador_s++;
            


    },1000)

}

// Esta funcion llama a estas tres funciones a la vez para así comenzar en juego y se cargarán desde que se carque la página
function startGame() {
    generateWord();
    generateDash(word.length);
    generateButtons ('a', 'z');
    time();

}

window.onload = startGame();