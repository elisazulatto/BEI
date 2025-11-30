import express from 'express';
import http from "http";
import { Server } from "socket.io";
//import { server, startServer } from './servidor-nativo-node.js';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import { root, home } from './controllers/root.controllers.js';
import { engine } from 'express-handlebars';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

//esto es para configurar el motor de vistas
//app.engine("view engine","nombre fantasia") -- Le instalamos a express nuevos motores
//app.set("nombre fantasia", motor) -- Le decimos a express cual motor usar

const app = express();
const servidor = http.createServer(app); //le paso la capa de aplicación como parametro, la logica del servidor la esta manejando express 

//aca creo un servidor ws (websocket)
const servidorWS = new Server(servidor);

servidorWS.on("connection", (socket) => {
    console.log("Nuevo cliente conectado por WS")
    socket.on('mensaje', (mensaje) => {
        console.log(mensaje);
    });
})

//middleware para cargar el index.js o el css o cuaquier archivo estatico que me interese
app.use(express.json());
app.use(express.static("public")); //este middleware ya viene preparado por el mismo express, entre comillas decimos a donde queremos que express busque el archivo en caso de que haga falta (json, documento, archivo, lo que sea que necesite)
//esa linea dice que por ejemplo si me hacen un pedido con metodo GET y la ruta es /index.css (ej) lo busco en la carpeta pubic, si lo encuentro lo devuelvo y si no mando un 404


app.engine('handlebars', engine()); //aca le decimos que handlebars en nuestro diccionario significa engine()
app.set('view engine', 'handlebars');
app.set('views', './views'); // Configurar la carpeta de vistas


// Ruta para vista home con lista de productos
app.get('/', home);

// Configurar rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Ruta para vista de productos
app.get('/products', async (req, res, next) => {
    try {
        const { getAllProducts } = await import('./products.js');
        const products = await getAllProducts('products.txt');
        res.render('products', { products });
    } catch (error) {
        next(error);
    }
});

// Middleware para rutas no encontradas (debe ir después de todas las rutas)
app.use(notFoundHandler);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

const PORT = 8080;
servidor.listen(PORT, () => {
    console.log('Servidor corriendo')
})