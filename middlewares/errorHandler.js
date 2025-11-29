// Middleware de manejo de errores centralizado

export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Determinar el código de estado del error
    const statusCode = err.status || err.statusCode || 500;

    // Respuesta genérica de error en formato JSON para Postman
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error interno del servidor',
        error: err.name || 'Error',
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            details: err
        })
    });
};

// Middleware para manejar rutas no encontradas (404)
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
};

