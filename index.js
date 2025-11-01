import express from 'express';
import { server, startServer } from './servidor-nativo-node.js';
import { Product, getProductById, addNewProduct } from './products.js';


//Add all the routes
//server.method(route, callback)  -----> callback is what we wanna do when the route is accessed

server.get('/', (req, res) => { //listar todos los productos de la base de datos
    console.log('Home page when the method is GET')
    const data = product.addNewProduct(title, description, price, stock, img)  //this is a promise, so we need to wait for it to be resolved
    data.then((data) => {
        res.send(data)
    })
        .catch((error) => {
            res.send({ error: error.message })
        })
})

server.get('/pid', (req, res) => {
    console.log("Get product by id")
    const productById = getProductById(id, fileOfProducts)
})

server.post('/', (req, res) => {
    const product = new Product(req.body.title, req.body.description, req.body.price, req.body.stock, req.body.img)
    addNewProduct(product, fileOfProducts)
        .then(() => {
            res.send("Product added")
        })
        .catch(() => {
            res.send("Error adding product")
        })
})

startServer(8080);