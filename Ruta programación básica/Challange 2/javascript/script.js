//Variables
let palabras=["HTML","CSS","SHELDON","TED","ELPEPE"];
let palabraSecreta;

//Conecta la parte lógica con la parte visual
var btnNuevoJuego=document.getElementById("btnNuevoJuego");
var lienzo=document.getElementById("Guiones").getContext("2d");

// Constructor
function init(){
    generarPalabra();
    dibujarGuiones();
    cargarLetras();
}
//Almacena las palabras y elige una aleatoriamente
function generarPalabra(){


    let num = Math.floor(Math.random() * palabras.length);;
    palabraSecreta=palabras[num];
    
    
}

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

function cargarLetras(){

    lienzo.font = "50px Arial";

    let anchura=600/palabraSecreta.length;

    for(let i=0; i<palabraSecreta.length;i++){
        lienzo.fillText(palabraSecreta[i], 355+anchura*i, 90);
    }

}

init();
btnNuevoJuego.onclick=init;
