import express from 'express';
import { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct } from '../products.js';

const router = express.Router();
const products_file = 'products.txt'; // Archivo donde se guardan los productos

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts(products_file);
        res.json({ status: 'success', payload: products });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await getProductById(pid, products_file);
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Se hizo un POST de product')
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        const newProduct = await addNewProduct({
            title,
            description,
            code,
            price: Number(price),
            status: status !== undefined ? status : true,
            stock: Number(stock),
            category,
            thumbnails: thumbnails || []
        }, products_file);

        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await updateProduct(pid, req.body, products_file);
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await deleteProduct(pid, products_file);

        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

//agregar producto por id al carrito, con el id del carrito 
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await addProductToCart(cid, pid, carts_file);

        if (!updatedCart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
export default router;

