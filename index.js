import { server, startServer } from './servidor-nativo-node.js';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';

// Configurar rutas
server.use('/api/products', productsRoutes);
server.use('/api/carts', cartsRoutes);

server.get('/', (req, res) => {
    console.log('Solicitud recibida desde el navegador en la ruta raíz "/"');
    res.json({ message: 'API de gestión de productos y carritos' });
});

// Iniciar servidor en puerto 8080
startServer(8080);