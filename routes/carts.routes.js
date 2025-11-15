import express from 'express';
import { createProduct } from '../controllers/products.controllers.js';
import { getCartById } from '../controllers/carts.controllers.js';

const router = express.Router();

router.post('/', createProduct)

router.get('/:cid', getCartById)

export default router;

