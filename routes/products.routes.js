import express from 'express';
import { addProductToACart, createProduct, deleteProduct, getProduct, getProductById, updateProducts } from '../controllers/products.controllers.js';

const router = express.Router();

router.post('/', createProduct);

router.get('/', getProduct);

router.get('/:pid', getProductById)

router.put('/:pid', updateProducts)

router.delete('/:pid', deleteProduct)

//agregar producto por id al carrito, con el id del carrito 
router.post('/:cid/product/:pid', addProductToACart)

export default router;

