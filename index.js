import express from 'express';
import { server, startServer } from './servidor-nativo-node.js';
import messageManager from './messageManager.js';


//Add all the routes
//server.method(route, callback)  -----> callback is what we wanna do when the route is accessed

server.get('/', (req, res) => {
    console.log('Home page when the method is GET')
    const data = messageManager.readMessagesAsync()  //this is a promise, so we need to wait for it to be resolved
    data.then((data) => {
        res.send(data)
    })
        .catch((error) => {
            res.send({ error: error.message })
        })
})

server.post('/', () => { console.log('Home page when the method is POST') })

startServer(8080);