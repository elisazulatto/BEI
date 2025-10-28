import express from 'express';

export const server = express();

// Middleware para recibir JSON en req.body
server.use(express.json());


export function startServer(PORT) {
    server.listen(PORT, () => {
        console.log(`Our server is running as expected on port ${PORT}`);
    });
}