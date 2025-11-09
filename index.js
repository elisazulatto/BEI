import { server, startServer } from './servidor-nativo-node.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Configurar rutas
server.use('/api/products', productsRouter);
server.use('/api/carts', cartsRouter);

// Ruta raíz: esto es lo que va a llamar si yo hago un localhost:8080
server.get('/', (req, res) => {
    console.log('Solicitud recibida desde el navegador en la ruta raíz "/"');
    res.json({ message: 'API de gestión de productos y carritos' });
});

// Iniciar servidor en puerto 8080
startServer(8080);