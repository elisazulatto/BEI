import express from 'express';
import { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct } from '../products.js';

const router = express.Router();
const FILE_PATH = 'products.json'; // Archivo donde se guardan los productos

// GET / - Listar todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts(FILE_PATH);
        res.json({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await getProductById(pid, FILE_PATH);

        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST / - Agregar nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        // Validar campos requeridos
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields: title, description, code, price, stock, category'
            });
        }

        const newProduct = await addNewProduct({
            title,
            description,
            code,
            price: Number(price),
            status: status !== undefined ? status : true,
            stock: Number(stock),
            category,
            thumbnails: thumbnails || []
        }, FILE_PATH);

        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await updateProduct(pid, req.body, FILE_PATH);

        if (!updatedProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await deleteProduct(pid, FILE_PATH);

        if (!deletedProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;

