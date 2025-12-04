//Aca controlamos la lógica 
import {
    addNewProduct,
    getProductById as getProductByIdService,
    updateProduct,
    getAllProducts,
    deleteProduct as deleteProductService
} from '../services/products.service.js';

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
        });

        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        // Obtener query params para filtros, paginación y ordenamiento
        const { limit, page, sort, category, status, minPrice, maxPrice } = req.query;

        const result = await getAllProducts({
            limit,
            page,
            sort,
            category,
            status,
            minPrice,
            maxPrice
        });

        // Si es una petición para renderizar vista
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            res.render("products", {
                products: result.products,
                pagination: result.pagination
            });
        } else {
            // Si es una petición API, devolver JSON con paginación
            res.json({
                status: 'success',
                payload: result.products,
                ...result.pagination
            });
        }
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await getProductByIdService(pid);

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
        const updatedProduct = await updateProduct(pid, req.body);

        if (!updatedProduct) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await deleteProductService(pid);

        if (!deletedProduct) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        }

        res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        next(error);
    }
};