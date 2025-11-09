import fs from 'fs/promises';

class Cart {
    constructor() {
        this.id = Math.random().toString(36).substring(2, 11); // ID único alfanumérico
        this.products = [];
    }
}

// Obtener todos los carritos
async function getAllCarts(fileOfCarts) {
    try {
        const data = await fs.readFile(fileOfCarts, 'utf-8');
        if (!data.trim()) {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.log("Error reading carts:", error.message);
        return [];
    }
}

// Obtener carrito por ID
async function getCartById(cid, fileOfCarts) {
    try {
        const carts = await getAllCarts(fileOfCarts);
        const cart = carts.find((c) => c.id === cid);
        return cart || null;
    } catch (error) {
        console.log("Error getting cart by id:", error.message);
        return null;
    }
}

// Crear nuevo carrito
async function createCart(fileOfCarts) {
    try {
        const carts = await getAllCarts(fileOfCarts);

        const newCart = new Cart();

        carts.push(newCart);

        await fs.writeFile(fileOfCarts, JSON.stringify(carts, null, 2));

        return newCart;
    } catch (error) {
        console.log("Error creating cart:", error.message);
        throw error;
    }
}

// Agregar producto al carrito
async function addProductToCart(cid, pid, fileOfCarts) {
    try {
        const carts = await getAllCarts(fileOfCarts);

        const cart = carts.find(c => c.id === cid);

        if (!cart) {
            return null; // Carrito no encontrado
        }

        // Buscar si el producto ya existe en el carrito
        const existingProduct = cart.products.find(p => p.product === pid);

        if (existingProduct) {
            // Si existe, incrementar quantity
            existingProduct.quantity += 1;
        } else {
            // Si no existe, agregarlo nuevo
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        // Guardar cambios
        await fs.writeFile(fileOfCarts, JSON.stringify(carts, null, 2));

        return cart;
    } catch (error) {
        console.log("Error adding product to cart:", error.message);
        throw error;
    }
}

export { Cart, getAllCarts, getCartById, createCart, addProductToCart };

