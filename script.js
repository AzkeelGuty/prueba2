
//Inicializacion de variables
let tarjetaDestapadas=0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado=null;
let segundoResultado=null;
let aciertosTotales = 0;
let erro=0
let aciertos=0;
let erro2=0;
let aciertos2=0;
let turno=1;
let audio1=new Audio('./musica/1.wav');
let iniciomusica= new Audio('./musica/jugando.mp3')
let audio2= new Audio('./musica/2.wav');
let audio3= new Audio('./musica/lose.wav')
//apuntado errores del memorama
let mostrarError=document.getElementById('contador_errada1');
let mostrarAciertos=document.getElementById('contador_aciertos1');
let turno1=document.getElementById('turno1');

let mostrarError2=document.getElementById('contador_errada');
let mostrarAciertos2=document.getElementById('contador_aciertos');
let turno2=document.getElementById('turno2');
//arreglo
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros=numeros.sort(() =>{return Math.random()-0.5});
console.log(numeros);
//funciones principales
function destapar(id){
    tarjetaDestapadas++;
    console.log(tarjetaDestapadas);

    if(tarjetaDestapadas==1){
        //mostrar primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML=`<img class="auto" src="./imagenes/${primerResultado}.jpg" alt="">`;
        //desabilitar botnoes cuando se eliga
        tarjeta1.disabled=true;
        audio1.play();
    }else if(tarjetaDestapadas=2){
        //mostrar segundo numero
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=`<img class="auto" src="./imagenes/${segundoResultado}.jpg" alt="">`;
        //desabilitar segundo boton
        tarjeta2.disabled=true;
        if(primerResultado==segundoResultado){
            audio2.play();
            //encerrar contador tarjetas destapadas
            tarjetaDestapadas=0;
            if(turno==1){
            //aumenta aciertos
            aciertosTotales++;
            aciertos++;
            mostrarAciertos.innerHTML=`${aciertos}`;
            turno1.classList.remove('turnocolor');
            turno2.classList.remove('turnocolor');
            turno1.classList.add('turnocolor');
            turno1.innerHTML='..Siga jugando..';
            turno2.innerHTML='..Espere su turno..';           
            }else{
            //aumenta aciertos
            aciertosTotales++;
            aciertos2++;
            mostrarAciertos2.innerHTML=`${aciertos2}`;
            turno1.classList.remove('turnocolor');
            turno2.classList.remove('turnocolor');
            turno2.classList.add('turnocolor');
            turno1.innerHTML='..Espere su turno..';
            turno2.innerHTML='..Siga jugando..';

            }
            if(aciertos+aciertos2==8){
                let mensajeGanador, mensajePerdedor;
                iniciomusica.pause();
                iniciomusica.currentTime=0;
                if (aciertos > aciertos2) {
                    mensajeGanador = "Jugador 1";
                    mensajePerdedor = "Jugador 2";
                } else if (aciertos2 > aciertos) {
                    mensajeGanador = "Jugador 2";
                    mensajePerdedor = "Jugador 1";
                } else {
                    mensajeGanador = "Ambos jugadores";
                    mensajePerdedor = "Ninguno";
                }
            
                mostrarAlerta();
                document.getElementById('customAlert').innerHTML = `
                    <h2>!Se ha completado el Juego!</h2>
                    <div class="figura">
                    <img src="./imagen/completo.png" width="25%" height="25%" />
                    </div>
                    <h3>🤴🏻🙇🏻--------Ganador--------🙇🏻🤴🏻</h3>
                    <h4>🥇${mensajeGanador}🥇</h4>
                    <h3>☠️🤡--------Vencido--------🤡☠️</h3>
                    <h4>🥈${mensajePerdedor}🥈</h4>
                    <div class="container">
                    <button onclick="cerrarAlerta()">Cerrar</button>
                    </div>`;
            }
            //de corar mensajes
        }else{
            audio3.play();
            setTimeout(function() {
                audio3.pause();
                audio3.currentTime=0; // Pausa el audio después de 0.5 segundos
            }, 500);
            
            //mostrar momentaneamente la tarrjeta
            setTimeout(()=> {
                tarjeta1.innerHTML=' ';
                tarjeta2.innerHTML=' ';
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetaDestapadas=0;
                cambiarTurno();
            },300);
            if(turno==1){
                erro++;
                mostrarError.innerHTML=`${erro}`;
                turno1.classList.remove('turnocolor');
                turno2.classList.remove('turnocolor');
                turno2.classList.add('turnocolor');
                turno1.innerHTML='..Espere su turno..';
                turno2.innerHTML='..Eliga las cartas..';
            }else{
                erro2++;
                mostrarError2.innerHTML=`${erro}`;
                turno1.classList.remove('turnocolor');
                turno2.classList.remove('turnocolor');
                turno1.classList.add('turnocolor');
                turno1.innerHTML='..Eliga las carta..';
                turno2.innerHTML='..Espere su turno..';
            }
        }
    }
};
function bloqueartrajetas(){
    for(let i=0;i<=15;i++){
        let tarjetaBloqueada=document.getElementById(i);
        let num=numeros[i];
        tarjetaBloqueada.innerHTML=`<img class="auto" src="./imagenes/${num}.jpg" alt="">`;
        tarjetaBloqueada.disabled=true;
    }
};

//variables
const card = document.querySelectorAll('.card');
const start = document.querySelector('.start');
//eventos
document.addEventListener('DOMContentLoaded',() => {
    inicarApp();
}) ;
start.addEventListener('click', () =>{
     // Si el botón tiene la clase 'disabled1', significa que se ha completado el juego
     if (start.classList.contains('disabled1')) {
        // Llama a la función para reiniciar el juego
        reiniciarJuego();
    } else {
        // Si no se ha completado el juego, inicia el cronómetro
        cronometro();
    }

}) ;

//Funciones para iniciar el juego
function inicarApp(){
    for (let i = 0 ; i < card.length; i++) {
        card[i].disabled= true;
    }
}
function desbloquearCards(){
    for (let i = 0 ; i < card.length; i++) {
        card[i].disabled= false;
    }
}
function tiempoterminado(){
    let mensajeGanador, mensajePerdedor;
    if (aciertos === 0 && aciertos2 === 0) {
        mensajeGanador = "Ninguno";
        mensajePerdedor = "Ninguno";
    } else if (aciertos > aciertos2) {
        mensajeGanador = "Jugador 1";
        mensajePerdedor = "Jugador 2";
    } else if (aciertos2 > aciertos) {
        mensajeGanador = "Jugador 2";
        mensajePerdedor = "Jugador 1";
    } else {
        mensajeGanador = "Ambos jugadores";
        mensajePerdedor = "Ninguno";
    }
      mostrarAlerta();
      document.getElementById('customAlert').innerHTML = `
          <h2>!Se acabo el tiempo del juego!</h2>
          <div class="figura">
          <img src="./imagen/acabo.png" width="25%" height="25%" />
          </div>
          <h3>🤴🏻🙇🏻--------Ganador--------🙇🏻🤴🏻</h3>
          <h4>🥇${mensajeGanador}🥇</h4>
          <h3>☠️🤡--------Vencido--------🤡☠️</h3>
          <h4>🥈${mensajePerdedor}🥈</h4>
          <div class="container">
          <button onclick="cerrarAlerta()">Cerrar</button>
          </div>`;
}
function mostrarAlerta() {
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('customAlertOverlay').style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; /* Cambia el color de fondo del cuerpo */
    var alerta = document.getElementById('customAlert');
    alerta.classList.add('show');
}
function cerrarAlerta() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('customAlertOverlay').style.display = 'none';
    document.body.style.backgroundColor = ''; /* Restaura el color de fondo del cuerpo */
    var alerta = document.getElementById('customAlert');
    alerta.classList.remove('show'); 
}
function cronometro(){
    desbloquearCards();
    let time = 5;
    iniciomusica.play();
    iniciomusica.volume=0.4;
    start.classList.add('disabled');
    turno1.classList.add('turnocolor');
    start.innerHTML = 'Juego en Curso'; // Cambia el texto del botón mientras el juego está en progreso
    turno1.innerHTML='..Eliga las cartas..';
    turno2.innerHTML='..Espere su turno..';
    const contador = setInterval(() => {
        time--;
        contador_cronometro.innerHTML =time;
        if (aciertosTotales === 8) {
            iniciomusica.pause();
            iniciomusica.currentTime = 0;
            clearInterval(contador);
            bloqueartrajetas();
            start.classList.add('disabled1');
            turno1.classList.remove('turnocolor');
            turno2.classList.remove('turnocolor');
            start.innerHTML = 'Iniciar Juego'; // Cambia el texto del botón cuando el juego se completa
            turno1.innerHTML = '..Juego completado..';
            turno2.innerHTML = '..Juego completado..';
        } else if(time==0){
            iniciomusica.pause();
            iniciomusica.currentTime=0;
            clearInterval(contador);
            bloqueartrajetas(); 
            start.classList.add('disabled1');
            turno1.classList.remove('turnocolor');
            turno2.classList.remove('turnocolor');
            start.innerHTML = 'Iniciar Juego'; // Cambia el texto del botón cuando el juego se completa
            turno1.innerHTML='..Se acabo el tiempo..';
            turno2.innerHTML='..Se acabo el tiempo..';
            tiempoterminado();
        }
    },1000);
}
function reiniciarJuego() {
    // Reinicializa las variables
    tarjetaDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    aciertosTotales = 0;
    erro = 0;
    aciertos = 0;
    erro2=0;
    aciertos2=0;
    turno=1;
    mostrarError.innerHTML = `${erro}`;
    mostrarAciertos.innerHTML = `${aciertos}`;
    mostrarError2.innerHTML = `${erro2}`;
    mostrarAciertos2.innerHTML = `${aciertos2}`;
    
    // Baraja nuevamente las tarjetas
    numeros = numeros.sort(() => { return Math.random() - 0.5 });
    // Restaura el contenido y el estado de las tarjetas
    for (let i = 0; i < card.length; i++) {
        card[i].innerHTML = '';
        card[i].disabled = false;
    }

    // Reinicia el cronómetro
    cronometro();
    start.classList.remove('disabled1'); // Elimina de arbol
}
function cambiarTurno() {
    if (turno === 1) {
        turno = 2;
    } else {
        turno = 1;
    }
}

