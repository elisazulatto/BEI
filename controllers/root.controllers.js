import { fileURLToPath } from 'url' // url y path son dos modulos nativos de express
//import { dirname } from 'path'
import { getAllProducts } from '../products.js';

const _filename = fileURLToPath(import.meta.url)
//const _dirname = dirname(_filename) //.... /controllers
//const urlRoot = join(_dirname, "..", "vistas", "index.html")
const products_file = 'products.txt';

export const root = (req, res) => {
    res.render("index")
    //express viene con un metodo .render q por dentro depende de una configuración que es el motor de vistas, que es como el servidor te va a ostrar el html, por ejemplo con handlebars o con react
};

export const home = async (req, res, next) => {
    try {
        const products = await getAllProducts(products_file);
        res.render('home', { products });
    } catch (error) {
        next(error);
    }
};