import api from '../api/products.js';


////////////////////////////////////////////////////////////////////////////////
//                               Get Controller                               //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res) => {
    const products = await api.getProducts();
    if (!products) {
        return res.status(404).json({message: 'Productos no encontrados'});
    }
    res.json(products);
};

const getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await api.getProduct(id);
    if (!product) {
        return res.status(404).json({message: 'Producto no encontrado'});
    }
    res.json(product);
};


///////////////////////////////////////////////////////////////////////////////
//                              Post Controller                              //
///////////////////////////////////////////////////////////////////////////////

const postProduct = async (req, res) => {
    const product = req.body;
    const createdProduct = await api.createProduct(product);
    if (!createdProduct) {
        return res.status(500).json({message: 'No se pudo crear el producto'});
    }   
    res.json(createdProduct);
    // console.log(product);
};


////////////////////////////////////////////////////////////////////////////////
//                               Put Controller                               //
////////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    const updatedProduct = await api.updateProduct(id, product);
    if (!updatedProduct) {
        return res.status(404).json({message: 'Producto no encontrado'});
    }   
    res.json(updatedProduct);
};


///////////////////////////////////////////////////////////////////////////////
//                             Delete Controller                             //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const removedProduct = await api.deleteProduct(id);
    if (!removedProduct) {
        return res.status(404).json({message: 'Producto no encontrado'});
    }   
    res.json(removedProduct);
};


export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
};
