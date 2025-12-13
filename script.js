let jugadores = [];
let jugadorActualIndex = 0;
let timerInterval = null;
let tiempoRestante = 600;

//Sliders Menu 
const sliderPlayers = document.getElementById('gmr-qty');
const sliderImpostor = document.getElementById('imp-qty');

const display = document.getElementById('actualValue');
const displayI = document.getElementById('actualValueImp');

const menuSeleccion = document.getElementById('menu-seleccion');
const gameDiv = document.getElementById('game');
const btnShow = document.getElementById('show');
const btnNext = document.getElementById('next-plyr');
const papel = document.getElementById('papel');
const timerDisplay = document.getElementById('timer');
const btnMenu = document.getElementById('btn-menu');

gameDiv.style.display = 'none';

sliderPlayers.addEventListener('input', () => {
display.textContent = sliderPlayers.value;
});
sliderImpostor.addEventListener('input', () => {
displayI.textContent = sliderImpostor.value;
});
//Category Array Option
const categories = ['Argentinismo', 'Trabajos', 'Lugares', 'Deportes','Aleatorio', 'Especial' ];
const select = document.getElementById('category');

categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.toLowerCase();
    option.textContent = cat;
    select.appendChild(option);
});

//BANK OF WORDS
const palabras = [
    { palabra: 'Lionel Messi', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Moria Casán', categorias: ['argentinismo'] },
    { palabra: 'Manu Ginóbili', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Dibu Martínez', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Escollera', categorias: ['lugares'] },
    { palabra: 'Nueva York', categorias: ['lugares'] },
    { palabra: 'París', categorias: ['lugares'] },
    { palabra: 'Tokio', categorias: ['lugares'] },
    { palabra: 'Río de Janeiro', categorias: ['lugares'] },
    { palabra: 'Las Vegas', categorias: ['lugares'] },
    { palabra: 'Venecia', categorias: ['lugares'] },
    { palabra: 'Cine', categorias: ['lugares'] },
    { palabra: 'Cancha de fútbol', categorias: ['lugares'] },
    { palabra: 'Parque de diversiones', categorias: ['lugares'] },
    { palabra: 'Museo', categorias: ['lugares'] },
    { palabra: 'Teatro', categorias: ['lugares'] },
    { palabra: 'Playa', categorias: ['lugares'] },
    { palabra: 'Centro comercial', categorias: ['lugares'] },
    { palabra: 'Restaurante', categorias: ['lugares'] },
    { palabra: 'Gimnasio', categorias: ['lugares'] },
    { palabra: 'Estadio', categorias: ['lugares'] },
    { palabra: 'Constructor', categorias: ['trabajos'] },
    { palabra: 'Conductor de radio', categorias: ['trabajos'] },
    { palabra: 'Tenis', categorias: ['deportes'] },
    { palabra: 'Fútbol', categorias: ['deportes'] },
    { palabra: 'Básquet', categorias: ['deportes'] },
    { palabra: 'Natación', categorias: ['deportes'] },
    { palabra: 'Vóley', categorias: ['deportes'] },
    { palabra: 'Boxeo', categorias: ['deportes'] },
    { palabra: 'Rugby', categorias: ['deportes'] },
    { palabra: 'Ciclismo', categorias: ['deportes'] },
    { palabra: 'Atletismo', categorias: ['deportes'] },
    { palabra: 'Golf', categorias: ['deportes'] },
    { palabra: 'Reloj', categorias: ['aleatorio'] },
    { palabra: 'Lapicera', categorias: ['aleatorio'] },
    { palabra: 'Almohada', categorias: ['aleatorio'] },
    { palabra: 'Botella', categorias: ['aleatorio'] },
    { palabra: 'Linterna', categorias: ['aleatorio'] },
    { palabra: 'Llavero', categorias: ['aleatorio'] },
    { palabra: 'Auriculares', categorias: ['aleatorio'] },
    { palabra: 'Cargador', categorias: ['aleatorio'] },
    { palabra: 'Cuaderno', categorias: ['aleatorio'] },
    { palabra: 'Gorra', categorias: ['aleatorio'] },
    { palabra: 'Martillo', categorias: ['aleatorio'] },
    { palabra: 'Baraja', categorias: ['aleatorio'] },
    { palabra: 'Termo', categorias: ['aleatorio'] },
    { palabra: 'Mouse', categorias: ['aleatorio'] },
    { palabra: 'Pelota', categorias: ['aleatorio'] },
    { palabra: 'Toalla', categorias: ['aleatorio'] },
    { palabra: 'Vela', categorias: ['aleatorio'] },
    { palabra: 'Cepillo', categorias: ['aleatorio'] },
    { palabra: 'Mochila', categorias: ['aleatorio'] },
    { palabra: 'Piedra', categorias: ['aleatorio'] },
    { palabra: 'Truco', categorias: ['argentinismo'] },
    { palabra: 'Fernet', categorias: ['argentinismo'] },
    { palabra: 'Bondi', categorias: ['argentinismo'] },
    { palabra: 'Birra', categorias: ['argentinismo'] },
    { palabra: 'Chamuyo', categorias: ['argentinismo'] },
    { palabra: 'Maradona', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Carlos Tevez', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Juan Martín Del Potro', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Sergio Agüero', categorias: ['argentinismo', 'deportes'] },
    { palabra: 'Canelo Álvarez', categorias: ['deportes', 'aleatorio'] },
    { palabra: 'La Bombonera', categorias: ['argentinismo', 'lugares', 'deportes'] },
    { palabra: 'El Monumental', categorias: ['argentinismo', 'lugares', 'deportes'] },
    { palabra: 'Obelisco', categorias: ['argentinismo', 'lugares'] },
    { palabra: 'Plaza de Mayo', categorias: ['argentinismo', 'lugares'] },
    { palabra: 'Caminito', categorias: ['argentinismo', 'lugares'] },
    { palabra: 'Cataratas del Iguazú', categorias: ['argentinismo', 'lugares'] },
    { palabra: 'Glaciar Perito Moreno', categorias: ['argentinismo', 'lugares'] },
    { palabra: 'Bariloche', categorias: ['argentinismo', 'lugares'] },
    { palabra: 'Mate', categorias: ['argentinismo', 'aleatorio'] },
    { palabra: 'Empanada', categorias: ['argentinismo', 'aleatorio'] },
    { palabra: 'Dulce de leche', categorias: ['argentinismo', 'aleatorio'] },
    { palabra: 'Alfajor', categorias: ['argentinismo', 'aleatorio'] },
    { palabra: 'Asado', categorias: ['argentinismo', 'aleatorio'] },
    { palabra: 'Pelota de fútbol', categorias: ['deportes', 'aleatorio'] },
    { palabra: 'Raqueta', categorias: ['deportes', 'aleatorio'] },
    { palabra: 'Casa de Teresa', categorias: ['especial'] },
    { palabra: 'Milanesas de Teresa', categorias: ['especial'] },
    { palabra: 'Paletas', categorias: ['especial'] },
    { palabra: 'Gimnasio', categorias: ['especial'] },
    { palabra: 'Pasco', categorias: ['especial'] },
    { palabra: 'Molet', categorias: ['especial'] },
    { palabra: 'Busta', categorias: ['especial'] },
    { palabra: 'Gallo', categorias: ['especial'] },
    { palabra: 'Rulo', categorias: ['especial'] },
    { palabra: 'Peruti', categorias: ['especial'] },
    { palabra: 'Jere', categorias: ['especial'] },
    { palabra: 'Black', categorias: ['especial'] },
    { palabra: 'Tanga', categorias: ['especial'] },
    { palabra: 'Vlog', categorias: ['especial'] },
];
// Game Variables
let palabrasFiltradas = [];
let palabraActual = null;

// WORDS FILTER
select.addEventListener('change', () => {
    const categoriaElegida = select.value;
    
    if (!categoriaElegida) {
        palabrasFiltradas = [];
        return;
    }
    
    if (categoriaElegida === 'aleatorio') {
        // Todas las palabras excepto especial
        palabrasFiltradas = palabras.filter(p => !p.categorias.includes('especial'));
    } else {
        palabrasFiltradas = palabras.filter(p => p.categorias.includes(categoriaElegida));
    }
    
    console.log(`Categoría: ${categoriaElegida}, Palabras disponibles: ${palabrasFiltradas.length}`);
});

// Random Word
function elegirPalabraRandom() {
    if (palabrasFiltradas.length === 0) {
        console.log('No hay palabras disponibles');
        return null;
    }
    const index = Math.floor(Math.random() * palabrasFiltradas.length);
    return palabrasFiltradas[index].palabra;
}
function formatearTiempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg.toString().padStart(2, '0')}`;
}

function iniciarTimer() {
    tiempoRestante = 600;
    timerDisplay.textContent = formatearTiempo(tiempoRestante);
    timerDisplay.style.display = 'block';
    
    timerInterval = setInterval(() => {
        tiempoRestante--;
        timerDisplay.textContent = formatearTiempo(tiempoRestante);
        
        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            finDelJuego();
        }
    }, 1000);
}

function finDelJuego() {
    btnShow.style.display = 'none';
    btnNext.style.display = 'none';
    
    // Encontrar los impostores
    const impostores = jugadores
        .map((esImpostor, index) => esImpostor ? index + 1 : null)
        .filter(j => j !== null);
    
    const textoImpostores = impostores.length === 1 
        ? `El impostor era el Jugador ${impostores[0]}`
        : `Los impostores eran los Jugadores ${impostores.join(' y ')}`;
    
    papel.textContent = `⏱️ ¡Tiempo terminado! ${textoImpostores}`;
    btnMenu.style.display = 'inline-block';
}

// GAME
function empezarJuego() {
    const cantidadJugadores = parseInt(sliderPlayers.value);
    const cantidadImpostores = parseInt(sliderImpostor.value);
    
    if (palabrasFiltradas.length === 0) {
        alert('Elegí una categoría primero');
        return;
    }
    
    if (cantidadImpostores >= cantidadJugadores) {
        alert('Los impostores no pueden ser igual o más que los jugadores');
        return;
    }
    
    // Elegir palabra
    palabraActual = elegirPalabraRandom();
    
   
    jugadores = Array(cantidadJugadores).fill(false);
    
    // Asignar impostores random
    let impostoresAsignados = 0;
    while (impostoresAsignados < cantidadImpostores) {
        const randomIndex = Math.floor(Math.random() * cantidadJugadores);
        if (!jugadores[randomIndex]) {
            jugadores[randomIndex] = true;
            impostoresAsignados++;
        }
    }
    
    jugadorActualIndex = 0;
    
    menuSeleccion.style.display = 'none';
    gameDiv.style.display = 'block';
    timerDisplay.style.display = 'none'; // Ocultar timer hasta que empiece la ronda
    btnMenu.style.display = 'none';
    
    resetearRevelacion();
}

function resetearRevelacion() {
    papel.textContent = `Jugador ${jugadorActualIndex + 1}, tocá Revelar`;
    btnShow.style.display = 'inline-block';
    btnNext.style.display = 'none';
}

// Revelar rol
btnShow.addEventListener('click', () => {
    const esImpostor = jugadores[jugadorActualIndex];
    
    if (esImpostor) {
        papel.textContent = '🔪 IMPOSTOR 🔪';
    } else {
        papel.textContent = `📝 ${palabraActual}`;
    }
    
    btnShow.style.display = 'none';
    btnNext.style.display = 'inline-block';
});

// Siguiente jugador
btnNext.addEventListener('click', () => {
    jugadorActualIndex++;
    
    if (jugadorActualIndex >= jugadores.length) {
        // Todos vieron su rol, iniciar cuenta regresiva
        iniciarCuentaRegresiva();
    } else {
        resetearRevelacion();
    }
});

function iniciarCuentaRegresiva() {
    let cuenta = 3;
    btnShow.style.display = 'none';
    btnNext.style.display = 'none';
    
    papel.textContent = cuenta;
    
    const interval = setInterval(() => {
        cuenta--;
        if (cuenta > 0) {
            papel.textContent = cuenta;
        } else {
            clearInterval(interval);
            const jugadorInicia = Math.floor(Math.random() * jugadores.length) + 1;
            papel.textContent = `🎮 Empieza Jugador ${jugadorInicia}`;
            btnMenu.style.display = 'inline-block';
            iniciarTimer();
        }
    }, 1000);
}
function volverAlMenu() {
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    
    gameDiv.style.display = 'none';
    menuSeleccion.style.display = 'block';
    timerDisplay.style.display = 'none';
    btnMenu.style.display = 'none';
    
    
    select.value = '';
    palabrasFiltradas = [];
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
