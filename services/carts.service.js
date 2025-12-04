import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Obtener todos los carritos
async function getAllCarts() {
    try {
        const carts = await Cart.find().populate('products.product');
        return carts;
    } catch (error) {
        console.log("Error reading carts:", error.message);
        throw error;
    }
}

// Obtener carrito por ID
async function getCartById(cid) {
    try {
        const cart = await Cart.findById(cid).populate('products.product').lean();
        if (!cart) {
            return null;
        }
        // Convertir _id a string y asegurar que los productos estén poblados correctamente
        const cartObj = {
            ...cart,
            _id: cart._id.toString(),
            products: cart.products.map(item => ({
                ...item,
                product: item.product ? {
                    ...item.product,
                    _id: item.product._id ? item.product._id.toString() : item.product._id
                } : null
            }))
        };
        return cartObj;
    } catch (error) {
        console.log("Error getting cart by id:", error.message);
        return null;
    }
}

// Crear nuevo carrito
async function createCart() {
    try {
        const newCart = new Cart({
            products: []
        });

        const savedCart = await newCart.save();
        return savedCart;
    } catch (error) {
        console.log("Error creating cart:", error.message);
        throw error;
    }
}

// Agregar producto al carrito
async function addProductToCart(cid, pid) {
    try {
        // Verificar que el producto existe
        const product = await Product.findById(pid);
        if (!product) {
            return null; // Producto no encontrado
        }

        // Buscar el carrito
        const cart = await Cart.findById(cid);
        if (!cart) {
            return null; // Carrito no encontrado
        }

        // Buscar si el producto ya existe en el carrito
        const existingProductIndex = cart.products.findIndex(
            item => item.product.toString() === pid
        );

        if (existingProductIndex !== -1) {
            // Si existe, incrementar quantity
            cart.products[existingProductIndex].quantity += 1;
        } else {
            // Si no existe, agregarlo nuevo
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        // Guardar cambios
        const updatedCart = await cart.save();

        // Retornar el carrito con los productos poblados
        return await Cart.findById(updatedCart._id).populate('products.product');
    } catch (error) {
        console.log("Error adding product to cart:", error.message);
        throw error;
    }
}

// Eliminar producto del carrito
async function removeProductFromCart(cid, pid) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return null; // Carrito no encontrado
        }

        cart.products = cart.products.filter(
            item => item.product.toString() !== pid
        );

        const updatedCart = await cart.save();
        return await Cart.findById(updatedCart._id).populate('products.product');
    } catch (error) {
        console.log("Error removing product from cart:", error.message);
        throw error;
    }
}

// Actualizar cantidad de un producto en el carrito
async function updateProductQuantity(cid, pid, quantity) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return null; // Carrito no encontrado
        }

        const productIndex = cart.products.findIndex(
            item => item.product.toString() === pid
        );

        if (productIndex === -1) {
            return null; // Producto no encontrado en el carrito
        }

        if (quantity <= 0) {
            // Si la cantidad es 0 o menor, eliminar el producto
            cart.products.splice(productIndex, 1);
        } else {
            cart.products[productIndex].quantity = quantity;
        }

        const updatedCart = await cart.save();
        return await Cart.findById(updatedCart._id).populate('products.product');
    } catch (error) {
        console.log("Error updating product quantity:", error.message);
        throw error;
    }
}

// Vaciar carrito
async function clearCart(cid) {
    try {
        const cart = await Cart.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        ).populate('products.product');

        return cart;
    } catch (error) {
        console.log("Error clearing cart:", error.message);
        throw error;
    }
}

// Actualizar todos los productos del carrito
async function updateCartProducts(cid, products) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return null; // Carrito no encontrado
        }

        // Validar que todos los productos existan
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Producto con ID ${item.product} no encontrado`);
            }
            if (!item.quantity || item.quantity < 1) {
                throw new Error('La cantidad debe ser mayor a 0');
            }
        }

        // Actualizar todos los productos del carrito
        cart.products = products.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));

        const updatedCart = await cart.save();
        return await Cart.findById(updatedCart._id).populate('products.product');
    } catch (error) {
        console.log("Error updating cart products:", error.message);
        throw error;
    }
}

// Eliminar carrito
async function deleteCart(cid) {
    try {
        const deletedCart = await Cart.findByIdAndDelete(cid);
        return deletedCart;
    } catch (error) {
        console.log("Error deleting cart:", error.message);
        throw error;
    }
}

export {
    getAllCarts,
    getCartById,
    createCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    updateCartProducts,
    clearCart,
    deleteCart
};
