import { getCartById as getCartByIdFromFile, createCart as createCartFromFile, addProductToCart } from '../carts.js';
const carts_file = 'carts.json'; // Archivo donde se guardan los carritos


export const createCart = async (req, res) => {
    try {
        console.log('Se hizo un POST de cart');
        const newCart = await createCartFromFile(carts_file);
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartByIdFromFile(cid, carts_file);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        console.log('Producto by id encontrado')
        res.json({ status: 'success', payload: cart.products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};