import { server, startServer } from './servidor-nativo-node.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Configurar rutas
server.use('/api/products', productsRouter);
server.use('/api/carts', cartsRouter);

// Ruta raíz
server.get('/', (req, res) => {
    res.json({ message: 'API de gestión de productos y carritos' });
});

// Iniciar servidor en puerto 8080
startServer(8080);