const fotos = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg', 'foto11.jpg', 'foto12.jpg','foto13.jpg', 'foto14.jpg'];
let fotoActual = 0;
let intervalo; // Variable para controlar el intervalo de cambio de fotos

// Configuración del Web Speech API para leer el poema en voz alta
const btnLeerPoema = document.getElementById('btnLeerPoema');
const poema = document.getElementById('poema').innerText;
const imagen = document.getElementById('imagen');

// Hacer visible la primera imagen inmediatamente
window.onload = function() {
    imagen.src = fotos[fotoActual];
    imagen.classList.add('visible');
};
// Función para leer el poema
btnLeerPoema.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (intervalo) clearInterval(intervalo); // Prevenir intervalos múltiples

        let speech = new SpeechSynthesisUtterance(poema);
        speech.lang = 'es-ES'; // Lenguaje en español
        speech.pitch = 1;
        speech.rate = 1;
        window.speechSynthesis.speak(speech);

        // Iniciar la secuencia de fotos durante la lectura
        cambiarFoto();

        // Detener la secuencia de fotos cuando termine el poema
        speech.onend = () => {
            clearInterval(intervalo);
        };
    } else {
        alert('La síntesis de voz no es compatible con tu navegador');
    }
});

// Función para cambiar las fotos en secuencia
function cambiarFoto() {
    intervalo = setInterval(() => {
        imagen.classList.remove('visible'); // Quitar clase visible antes de cambiar la imagen

        setTimeout(() => {
            fotoActual++;
            if (fotoActual >= fotos.length) {
                fotoActual = 0;
            }
            imagen.src = fotos[fotoActual];
            imagen.classList.add('visible'); // Volver a mostrar la imagen nueva
        }, 1000); // Tiempo suficiente para que desaparezca antes de cambiar
    }, 3000); // Cambiar cada 3 segundos
}


