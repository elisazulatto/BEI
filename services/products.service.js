import Product from '../models/product.model.js';

// Obtener todos los productos con filtros, paginación y ordenamiento
async function getAllProducts(queryParams = {}) {
    try {
        const {
            limit = 10,
            page = 1,
            sort,
            category,
            status,
            minPrice,
            maxPrice
        } = queryParams;

        // Construir filtros
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (status !== undefined) {
            filter.status = status === 'true' || status === true;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Construir opciones de consulta
        const options = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            lean: false
        };

        // Agregar ordenamiento
        if (sort) {
            const sortOrder = sort === 'desc' ? -1 : 1;
            options.sort = { price: sortOrder };
        }

        // Ejecutar consulta
        const products = await Product.find(filter, null, options);
        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / parseInt(limit));

        return {
            products,
            pagination: {
                total,
                limit: parseInt(limit),
                page: parseInt(page),
                totalPages,
                hasPrevPage: parseInt(page) > 1,
                hasNextPage: parseInt(page) < totalPages,
                prevPage: parseInt(page) > 1 ? parseInt(page) - 1 : null,
                nextPage: parseInt(page) < totalPages ? parseInt(page) + 1 : null
            }
        };
    } catch (error) {
        console.log("Error reading products:", error.message);
        throw error;
    }
}

// Crear un nuevo producto
async function addNewProduct(productData) {
    try {
        const newProduct = new Product({
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
            status: productData.status !== undefined ? productData.status : true,
            stock: productData.stock,
            category: productData.category,
            thumbnails: productData.thumbnails || []
        });

        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (error) {
        console.log("Error adding product:", error.message);
        throw error;
    }
}

// Obtener producto por ID
async function getProductById(id) {
    try {
        const product = await Product.findById(id);
        return product || null;
    } catch (error) {
        console.log("Error getting product by id:", error.message);
        return null;
    }
}

// Actualizar producto
async function updateProduct(pid, updatedData) {
    try {
        // Excluir _id y campos que no deben actualizarse
        const { _id, createdAt, ...dataToUpdate } = updatedData;

        const updatedProduct = await Product.findByIdAndUpdate(
            pid,
            dataToUpdate,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return null;
        }

        return updatedProduct;
    } catch (error) {
        console.log("Error updating product:", error.message);
        throw error;
    }
}

// Eliminar producto
async function deleteProduct(pid) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(pid);
        return deletedProduct;
    } catch (error) {
        console.log("Error deleting product:", error.message);
        throw error;
    }
}

export { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct };
