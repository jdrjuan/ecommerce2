import express from 'express';
import {engine} from 'express-handlebars';
import routerProducts from './routers/products.js';
import {products} from './constants/constants.js';

// import ProductModelMongoDB from './models/productsMongoDB.js';
import config from './config.js';

// await ProductModelMongoDB.connectDB();

const app = express();
const PORT = config.appPort;

app.use(express.static('public'));
app.use(express.json());

app.use('/api/products', routerProducts);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('home', { title: 'Inicio' });
});

app.get('/products', (req, res) => {
    res.render('products', {
        title: 'Productos',
        products: products
    });
});

app.get('/products/create', (req, res) => {
    res.render('products-create');
});

app.get('/products/:id', (req, res) => {
    const {id} = req.params;
    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).render('error-404');
    }
    const objectForRender = {
        ...product,
        title: `Detalles de ${product.title}`,
    };
    res.render('product', objectForRender);
});



const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}`));
server.on('error', error => console.log(`No se pudo iniciar Express: ${error.message}`));
