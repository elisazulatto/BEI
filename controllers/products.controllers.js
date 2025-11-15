//Aca controlamos la lógica 
import { addNewProduct, getProductById, updateProduct, getProduct } from '../products.js';
const products_file = 'products.txt'; // Archivo donde se guardan los productos

export const createProduct = async (req, res) => {
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
};

export const getProduct = async (req, res) => {
    try {
        const products = await getAllProducts(products_file);
        res.json({ status: 'success', payload: products });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await getProductById(pid, products_file);
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
};

export const updateProducts = async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await updateProduct(pid, req.body, products_file);
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await deleteProduct(pid, products_file);

        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
};

export const addProductToACart = async (req, res) => {
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
};