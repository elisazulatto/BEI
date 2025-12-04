import {
    getCartById,
    createCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    clearCart,
    deleteCart,
    getAllCarts
} from '../services/carts.service.js';
import { errorHandler } from '../middlewares/errorHandler.js';

export const createCartController = async (req, res, next) => {
    try {
        console.log('Se hizo un POST de cart');
        const newCart = await createCart();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        next(error);
    }
};

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await getCartById(cid);

        if (!cart) {
            const error = new Error('Carrito no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        next(error);
    }
};

export const getAllCartsController = async (req, res, next) => {
    try {
        const carts = await getAllCarts();
        res.json({ status: 'success', payload: carts });
    } catch (error) {
        next(error);
    }
};

export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await addProductToCart(cid, pid);

        if (!updatedCart) {
            const error = new Error('Carrito o producto no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        next(error);
    }
};

export const removeProductFromCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await removeProductFromCart(cid, pid);

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

export const updateProductQuantityController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 0) {
            const error = new Error('La cantidad debe ser un número positivo');
            error.status = 400;
            return next(error);
        }

        const updatedCart = await updateProductQuantity(cid, pid, quantity);

        if (!updatedCart) {
            const error = new Error('Carrito o producto no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        next(error);
    }
};

export const clearCartController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const clearedCart = await clearCart(cid);

        if (!clearedCart) {
            const error = new Error('Carrito no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: clearedCart });
    } catch (error) {
        next(error);
    }
};

export const deleteCartController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const deletedCart = await deleteCart(cid);

        if (!deletedCart) {
            const error = new Error('Carrito no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: deletedCart });
    } catch (error) {
        next(error);
    }
};