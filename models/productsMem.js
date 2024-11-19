import {products} from '../constants/constants.js';

class ProductModelMem {

    getNextId () {
        if (products.length === 0) {
            return '1';
        }
        return (Number(products[products.length - 1].id) + 1).toString();
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    createProduct (product) {
        product.id = this.getNextId();
        products.push(product);
        return product;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////`

    getProducts () {
        return products;
    }

    getProduct (id) {
        return products.find(product => product.id === id) || null;
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    updateProduct (id, product) {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }
        product.id = id;
        products[index] = product;
        return product;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////`

    deleteProduct (id) {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }
        const removedProduct = products.splice(index, 1)[0];
        return removedProduct;
    };

}

export default ProductModelMem;
