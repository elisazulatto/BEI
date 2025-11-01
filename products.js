import fs from 'fs/promises';

class Product {
    constructor(title, description, code, price, status, stock, category, thumbnails) {
        this.id = Math.random().toString(36).substr(2, 9); // ID único alfanumérico
        this.title = title;
        this.description = description;
        this.code = code;
        this.status = Boolean;
        this.category = String;
        this.thumbnail = thumbnail;
    }


}

function addNewProduct(product, fileOfProducts, stock = 0) {
    const prod = new Product(product.title, product.description, product.price, stock, product.img)
    fs.writeFile("listOfProducts.txt", JSON.stringify(prod))
        .then(() => console.log("Product added"))
        .catch(() => console.log("Error adding product"))
}

function getProductById(id, fileOfProducts) {


    try {
        const listOfProducts = fs.readFile(fileOfProducts),
        const productById = listOfProducts.find((product) => product.id === id)
        return productById
    } catch (error) {
        console.log("Error getting product by id")
        return "Error getting product by id"
    }

}

export { Product, getProductById, addNewProduct };