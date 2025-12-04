import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, updateProducts } from '../controllers/products.controllers.js';

const router = express.Router();

// POST /api/products - Crear un nuevo producto
router.post('/', createProduct);

// GET /api/products - Obtener todos los productos (con filtros, paginación y ordenamiento)
// Query params: limit, page, sort (asc/desc), category, status, minPrice, maxPrice
router.get('/', getProduct);

// GET /api/products/:pid - Obtener producto por ID
router.get('/:pid', getProductById);

// PUT /api/products/:pid - Actualizar producto
router.put('/:pid', updateProducts);

// DELETE /api/products/:pid - Eliminar producto
router.delete('/:pid', deleteProduct);

export default router;

