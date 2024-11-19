import ProductModelFile from "./productsFS.js";
import ProductModelMem from "./productsMem.js";
import ProductModelMongoDB from "./productsMongoDB.js";
import MongoDB from './DB/MongoDB.js';

class ProductModel {
    static get (type) {
        console.log(`###### Persistencia -> ${type} ######`)
        switch (type) {
            case 'FILE SYSTEM':
                return new ProductModelFile();
            case 'MONGODB':
                return new ProductModelMongoDB();
            case 'MEMORY':
            default:
                return new ProductModelMem();
        }
    }
}

export default ProductModel;
