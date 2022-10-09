//Variables
let palabras=["HTML","CSS","SHELDON","TED","ELPEPE"];
let palabraSecreta;
let letrasErroneas=[];
let primeraVez=true;
var reg = new RegExp(/[0-9  a-z  á-ý  Á-Ý  ]/g);

//Conecta la parte lógica con la parte visual
var btnNuevoJuego=document.getElementById("btnNuevoJuego");
var lienzo=document.getElementById("Guiones").getContext("2d");

//Captura los eventos del teclado

addEventListener('keypress',(e)=>{
    console.log(e);

    if(filtro(e.key)==true){
        
        if(verificar(e.key)==true){
            // LLAMAR FUNCIÓN DIBUJAR LETRA CORRECTA
            alert("CORRECTO");
            dibujarLetraCorrecta(e.key);
        } else {
            alert("La letra ingresada es incorrecta");
            // LLAMAR FUNCIÓN DIBUJAR LETRA INCORRECTA
        }

    } else {
        alert("Solo letras mayúsculas y sin acentos ( ´ )");
    }
    
})

//Filtro que detecta mayúsculas y acentos

function filtro(letra){
    let resultadoPrueba;

    if(letra.match(reg)) {
        resultadoPrueba=false;
        return resultadoPrueba;
    } else {
        resultadoPrueba=true;
        return resultadoPrueba;
    }

}

// Verifica si la letra ingresada es correcta

function verificar(letra) {

    let resultadoPrueba=false;
    let yaExiste=false;

    for (let i=0; i<palabraSecreta.length; i++){
        if (letra==palabraSecreta[i]){
            resultadoPrueba=true;
        }
    }

    if(resultadoPrueba==false){

        if(primeraVez==true){
            primeraVez=false;
            letrasErroneas[letrasErroneas.length]=letra;
        }

        else {

            for (let i=0; i<letrasErroneas.length; i++){
                if (letra==letrasErroneas[i]){
                    yaExiste=true;
                    alert("Ya ingresaste esta letra");
                }
            }

            if(yaExiste==false){
                letrasErroneas[letrasErroneas.length]=letra;
            }
        }

    }

    return resultadoPrueba;
}

// Constructor
function init(){
    generarPalabra();
    dibujarGuiones();
}

//Almacena las palabras y elige una aleatoriamente

function generarPalabra(){


    let num = Math.floor(Math.random() * palabras.length);;
    palabraSecreta=palabras[num];
    
    
}

// Dibuja todos los guiones para la palabra

function dibujarGuiones(){
    lienzo.lineWidth=6;
    lienzo.lineCap="round";
    lienzo.lineJoin="round";
    lienzo.strokeStyle="#0A3871";

    lienzo.beginPath();

    let anchura= 600/palabraSecreta.length;

    for(let i=0; i<palabraSecreta.length;i++){
        lienzo.moveTo(350+(anchura*i),100);
        lienzo.lineTo(400+(anchura*i),100);
    }

    lienzo.stroke();
    lienzo.closePath();

}

// DIBUJA LETRA CORRECTA

function dibujarLetraCorrecta(letra){

    lienzo.font = "50px Arial";

    let anchura=600/palabraSecreta.length;

    for(let i=0; i<palabraSecreta.length;i++){
        
        if(letra==palabraSecreta[i]){
            lienzo.fillText(palabraSecreta[i], 355+anchura*i, 90);
        }
        
    }

}

// DIBUJAR LETRA INCORRECTA
function dibujarLetraIncorrecta(){}

init();
btnNuevoJuego.onclick=init;
