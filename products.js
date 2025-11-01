import fs from 'fs/promises';

class Product {
    constructor(title, description, code, price, status, stock, category, thumbnails) {
        this.id = Math.random().toString(36).substr(2, 9); // ID único alfanumérico
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status !== undefined ? status : true;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails || [];
    }

}

async function getAllProducts(fileOfProducts) {
    try {
        const data = await fs.readFile(fileOfProducts, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.log("Error reading products:", error.message);
        return [];
    }
}

async function addNewProduct(productData, fileOfProducts) {
    try {
        const products = await getAllProducts(fileOfProducts);

        const newProduct = new Product(
            productData.title,
            productData.description,
            productData.code,
            productData.price,
            productData.status,
            productData.stock,
            productData.category,
            productData.thumbnails
        );

        products.push(newProduct);

        await fs.writeFile(fileOfProducts, JSON.stringify(products, null, 2));

        return newProduct;
    } catch (error) {
        console.log("Error adding product:", error.message);
        throw error;
    }
}

async function getProductById(id, fileOfProducts) {
    try {
        const products = await getAllProducts(fileOfProducts);
        const product = products.find((p) => p.id === id);
        return product || null;
    } catch (error) {
        console.log("Error getting product by id");
        return null;
    }
}

async function updateProduct(pid, updatedData, fileOfProducts) {
    try {
        const products = await getAllProducts(fileOfProducts);

        const index = products.getProductById(pid);

        //Actualizar sin tocar el id
        const { id, ...dataToUpdate } = updatedData;
        products[index] = { ...products[index], ...dataToUpdate };

        await fs.writeFile(fileOfProducts, JSON.stringify(products, null, 2));

        return products[index];
    } catch (error) {
        console.log("Error updating product:", error.message);
        throw error;
    }
}
async function deleteProduct(pid, fileOfProducts) {
    try {
        const products = await getAllProducts(fileOfProducts);
        const productToDelete = await getProductById(pid);

        const productsNew = products.spice(pid, 1);
        await fs.writeFile(fileOfProducts, JSON.stringify(productsNew, null, 2))

        return productsNew;
    } catch (error) {
        console.log("Error deleting product");
        throw error;
    }
}

export { Product, getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct };