console.log("Soy del front")

// Inicializar conexión Socket.IO
const socketDeWS = io();
const boton = document.querySelector('button');

socketDeWS.on('connect', () => {
    console.log('Conectado al servidor WebSocket');
});

boton.addEventListener('click', () => {
    socketDeWS.emit('mensaje', 'Hola desde el front');
});
