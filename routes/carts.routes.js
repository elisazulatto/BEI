import express from 'express';
import { getCartById, createCart, addProductToCart } from '../carts.js';

const router = express.Router();
const carts_file = 'carts.txt'; // Archivo donde se guardan los carritos

router.post('/', async (req, res) => {
    try {
        console.log('Se hizo un POST de cart');
        const newCart = await createCart(carts_file);
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartById(cid, carts_file);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        console.log('Producto by id encontrado')
        res.json({ status: 'success', payload: cart.products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;

