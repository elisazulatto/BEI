import Product from '../models/product.model.js';

// Obtener todos los productos con filtros, paginación y ordenamiento
async function getAllProducts(queryParams = {}, baseUrl = '/api/products') {
    try {
        const {
            limit = 10,
            page = 1,
            sort,
            query
        } = queryParams;

        // Construir filtros
        const filter = {};

        // El parámetro 'query' puede ser para filtrar por categoría o disponibilidad
        if (query) {
            const queryLower = query.toLowerCase();
            // Verificar si es un filtro de disponibilidad
            if (query === 'true' || query === 'false') {
                filter.status = query === 'true';
            } else if (queryLower === 'disponible' || queryLower === 'available') {
                filter.status = true;
            } else if (queryLower === 'no disponible' || queryLower === 'unavailable' || queryLower === 'no disponible') {
                filter.status = false;
            } else {
                // Si no es disponibilidad, buscar por categoría (case-insensitive)
                filter.category = { $regex: query, $options: 'i' };
            }
        }

        // Construir opciones de consulta
        const options = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            lean: true // Usar lean para obtener objetos planos que Handlebars puede usar
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
        const currentPage = parseInt(page);

        // Convertir _id a string para que Handlebars pueda usarlo
        const productsWithStringId = products.map(product => ({
            ...product,
            _id: product._id.toString()
        }));

        // Construir query string para los links
        const buildQueryString = (pageNum) => {
            const params = new URLSearchParams();
            const limitNum = parseInt(limit);
            if (limitNum && limitNum !== 10) params.append('limit', limitNum);
            if (pageNum && pageNum !== 1) params.append('page', pageNum);
            if (sort) params.append('sort', sort);
            if (query) params.append('query', query);
            const queryString = params.toString();
            return queryString ? `?${queryString}` : '';
        };

        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;

        return {
            products: productsWithStringId,
            pagination: {
                total,
                limit: parseInt(limit),
                page: currentPage,
                totalPages,
                hasPrevPage: currentPage > 1,
                hasNextPage: currentPage < totalPages,
                prevPage,
                nextPage,
                prevLink: prevPage ? `${baseUrl}${buildQueryString(prevPage)}` : null,
                nextLink: nextPage ? `${baseUrl}${buildQueryString(nextPage)}` : null
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
