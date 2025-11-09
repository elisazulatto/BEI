import express from 'express';

export const server = express();
const PORT = 8080;

// Middleware para recibir JSON en req.body
server.use(express.json());


export function startServer(PORT) {
    server.listen(PORT, () => {
        console.log(`Our server is running as expected on port ${PORT}`);
    });
}

// Forma nativa de no de de crear un servidor:
// import hht from "http"
// const servidor = http.createServer()
// console.log("Datos de mi servidor:", server)
// servidor.listen(8080)   ----> Aca lo que hago es ab