import mongoose from 'mongoose';
import MongoDB from './DB/MongoDB.js';

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    brand: String,
    category: String,
    shortDescription: String,
    longDescription: String,
    freeShipping: Boolean,
    mainPhoto: String,
});

const Product = mongoose.model('Product', productSchema);


class ProductModelMongoDB {

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createProduct (product) {
        if (! await MongoDB.connectDB()) {
            return {};
        }

        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error(`Error al dar de alta el producto: ${error.message}`);
            return {};
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////`

    async getProducts () {
        if (! await MongoDB.connectDB()) {
            return null;
        }
        try {
            const products = await Product.find({});
            return products;
        } catch (error) {
            console.error(`Error al leer los productos: ${error.message}`);
            return null;
        }
    };

    async getProduct (id) {
        if (!await MongoDB.connectDB()) {
            return null;
        }
        try {
            const foundProduct = await Product.findById(id);
            return foundProduct;
        } catch (error) {
            console.error(`Error al leer el producto #${id}: ${error.message}`);
            return null;
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateProduct (id, product) {
        if (!await MongoDB.connectDB()) {
            return null;
        }
        
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, {$set: product}, {
                returnDocument: 'after'
            });
            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar el producto #:${id}: ${error.message}`);
            return null;
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async deleteProduct (id) {
        if (!await MongoDB.connectDB()) {
            return null;
        }

        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            console.log('Producto eliminado:', deletedProduct);
            return deletedProduct;
        } catch (error) {
            console.error(`Error al eliminar el producto #${id}: ${error.message}`);
            return null;
        }
    };

}


export default ProductModelMongoDB;
