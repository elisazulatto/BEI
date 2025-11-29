import { server, startServer } from './servidor-nativo-node.js';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import { root } from './controllers/root.controllers.js';

// Configurar rutas
server.use('/api/products', productsRoutes);
server.use('/api/carts', cartsRoutes);

server.get('/', root)

// Iniciar servidor en puerto 8080
startServer(8080);