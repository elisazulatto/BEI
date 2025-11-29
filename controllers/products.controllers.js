//Aca controlamos la lógica 
import { addNewProduct, getProductById as getProductByIdFromFile, updateProduct, getAllProducts, deleteProduct as deleteProductFromFile } from '../products.js';
import { addProductToCart } from '../carts.js';
const products_file = 'products.txt'; // Archivo donde se guardan los productos
const carts_file = 'carts.json'; // Archivo donde se guardan los carritos

export const createProduct = async (req, res, next) => {
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
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const products = await getAllProducts(products_file);
        res.json({ status: 'success', payload: products });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await getProductByIdFromFile(pid, products_file);

        if (!product) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: product });
    } catch (error) {
        next(error);
    }
};

export const updateProducts = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await updateProduct(pid, req.body, products_file);
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await deleteProductFromFile(pid, products_file);

        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        next(error);
    }
};

export const addProductToACart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await addProductToCart(cid, pid, carts_file);

        if (!updatedCart) {
            const error = new Error('Carrito no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        next(error);
    }
};