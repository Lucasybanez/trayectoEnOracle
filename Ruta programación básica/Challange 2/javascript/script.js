//Variables

let palabras=["SHELDON","GATO"];
let palabraSecreta;
let vidas=9;
let letrasErroneas=[];
var aciertos=0;
var reg = new RegExp(/[0-9  a-z  á-ý  Á-Ý  ]/g);


//Conecta la parte lógica con la parte visual
var btnNuevoJuego=document.getElementById("btnNuevoJuego");
var lienzo=document.getElementById("Guiones").getContext("2d");
var lienzoHorca=document.getElementById("Horca").getContext("2d");

//Captura los eventos del teclado

addEventListener('keypress',(e)=>{

    if(vidas>=0){
        if(filtro(e.key)==true){
        
            if(verificar(e.key)==true){
                dibujarLetraCorrecta(e.key);
                aciertos++;
            } else {
                dibujarLetraIncorrecta();
            }
    
        }
    }
    
})
// DIBUJO DE LA HORCA

function dibujarHorca(vidasRestantes){

    lienzoHorca.beginPath();
    lienzoHorca.lineWidth=5;
    lienzoHorca.lineCap="round";
    lienzoHorca.lineJoin="round";
    lienzoHorca.strokeStyle="#0A3871";

    switch(vidasRestantes){
        case 9:
            //Trazo base
            lienzoHorca.moveTo(240,450);
            lienzoHorca.lineTo(960,450);
            break;
        case 8:
            // Trazo palo vertical
            lienzoHorca.moveTo(480,450);
            lienzoHorca.lineTo(480,50);
            break;
        case 7:
            // Trazo palo horizontal
            lienzoHorca.moveTo(480,50);
            lienzoHorca.lineTo(650,50);
            break;
        case 6:
            // Trazo palo vertical corto
            lienzoHorca.moveTo(650,50);
            lienzoHorca.lineTo(650,100);
            break;
        case 5:
            // CABEZA
            lienzoHorca.lineWidth=70;
            lienzoHorca.moveTo(650,130);
            lienzoHorca.lineTo(650,130);
            break;
        case 4:
            // TORSO
            lienzoHorca.moveTo(650,130);
            lienzoHorca.lineTo(650,300);
            break;
        case 3:
            // BRAZO IZQUIERDO
            lienzoHorca.moveTo(650,180);
            lienzoHorca.lineTo(620,240);
            break;
        case 2:
            // BRAZO DERECHO
            lienzoHorca.moveTo(650,180);
            lienzoHorca.lineTo(680,240);
            break;
        case 1:
            //PIERNA DERECHA
            lienzoHorca.moveTo(650,300);
            lienzoHorca.lineTo(680,360);
            break;
        case 0:
            //PIERNA IZQUIERDA
            lienzoHorca.moveTo(650,300);
            lienzoHorca.lineTo(620,360); 
            alert("Fin del juego, la palabra era: "+palabraSecreta);
            break;
                                                                                                          
    }

    lienzoHorca.stroke();
    lienzoHorca.closePath();
    vidas=vidas-1;
}


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

        for (let i=0; i<letrasErroneas.length; i++){
            if (letra==letrasErroneas[i]){
                yaExiste=true;
                alert("Ya ingresaste esta letra");
            }
        }

        if(yaExiste==false){
            letrasErroneas[letrasErroneas.length]=letra;
            dibujarHorca(vidas);
        }

    }

    return resultadoPrueba;
}

// Constructor
function init(){

    letrasErroneas=[];
    vidas=9;
    generarPalabra();
    limpiarLienzo(lienzo,1000);
    limpiarLienzo(lienzoHorca,2000);
    dibujarGuiones();
    dibujarLetraIncorrecta();
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

function limpiarLienzo(lienzoALimpiar, ancho){

        lienzoALimpiar.lineWidth=ancho;
        lienzoALimpiar.strokeStyle="#F3F5FC";
        //lienzo.strokeStyle=color;
        lienzoALimpiar.beginPath();
        lienzoALimpiar.moveTo(1100,180);
        lienzoALimpiar.lineTo(0,180);
        lienzoALimpiar.stroke();
        lienzoALimpiar.closePath();

}
// DIBUJAR LETRA INCORRECTA
function dibujarLetraIncorrecta(){

    limpiarLienzo(lienzo,100);

    lienzo.font = "20px Arial";

    let anchura=500/letrasErroneas.length;

    for(let i=0; i<letrasErroneas.length;i++){
        
        lienzo.fillText(letrasErroneas[i], 375+anchura*i, 160);
    }

}

init();
btnNuevoJuego.onclick=init;
