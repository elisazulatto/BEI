import express from 'express';
import {
    createCartController,
    getCartByIdController,
    getAllCartsController,
    addProductToCartController,
    removeProductFromCartController,
    updateProductQuantityController,
    clearCartController,
    deleteCartController
} from '../controllers/carts.controllers.js';

const router = express.Router();

// POST /api/carts - Crear un nuevo carrito
router.post('/', createCartController);

// GET /api/carts - Obtener todos los carritos
router.get('/', getAllCartsController);

// GET /api/carts/:cid - Obtener carrito por ID
router.get('/:cid', getCartByIdController);

// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', addProductToCartController);

// PUT /api/carts/:cid/product/:pid - Actualizar cantidad de producto en el carrito
// Body: { quantity: number }
router.put('/:cid/product/:pid', updateProductQuantityController);

// DELETE /api/carts/:cid/product/:pid - Eliminar producto del carrito
router.delete('/:cid/product/:pid', removeProductFromCartController);

// DELETE /api/carts/:cid - Vaciar carrito
router.delete('/:cid', clearCartController);

// DELETE /api/carts/:cid/delete - Eliminar carrito completamente
router.delete('/:cid/delete', deleteCartController);

export default router;

