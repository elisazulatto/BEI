import fs from 'fs/promises';

class Product {
    constructor(title, description, price, stock, img) {
        this.id = Math.random();
        this.title = string;
        this.description = string;
        this.price = Number;
        this.stock = Number;
        this.code = code;
        this.status = Boolean;
        this.category = String;
        this.thumbnail = thumbnail;
    }

    addNewProduct() {
        fs.writeFile("listOfProducts.txt", JSON.stringify(this))
            .then(() => console.log("Product added"))
            .catch(() => console.log("Error adding product"))
    }

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

export { Product, getProductById };