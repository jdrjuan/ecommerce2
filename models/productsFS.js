import {promises as fs} from 'fs';
import path from 'path';

class ProductModelFile {

    productsFileName = 'products.json';
    filePath = path.join(process.cwd(), 'models', this.productsFileName);
    charset = 'utf-8';

    async readProductsData () {
        let products = [];
        try {
            const fileContent = await fs.readFile(this.filePath, this.charset);
            const parsedContent = JSON.parse(fileContent);
            if (!Array.isArray(parsedContent)) {
                throw new Error('El archivo JSON no contiene un array válido de productos');
            }
            products = parsedContent;
        } catch (error) {
            console.error(`Se produjo un error al intentar leer el archivo: ${error.message}`);
        }
        return products;
    }

    async writeProductsData (products) {
        const serializedProducts = JSON.stringify(products, null, '\t');
        try {
            await fs.writeFile(this.filePath, serializedProducts);
        } catch (error) {
            console.error(`Se produjo un error al intentar escribir el archivo: ${error}`);
            return false;
        }
        return true;
    }

    getNextId (products) {
        return (Number(products[products.length - 1].id) + 1).toString();
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createProduct (product) {
        const products = await this.readProductsData();

        product.id = this.getNextId(products);
        products.push(product);
        const writeOk = await this.writeProductsData(products);
        if (!writeOk) {
            return null;
        }
        return product;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////`

    async getProducts () {
        const products = await this.readProductsData();
        return products;
    };

    async getProduct (id) {
        const products = await this.readProductsData();
        return products.find(product => product.id === id) || null;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateProduct (id, product) {
        const products = await this.readProductsData();

        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }
        product.id = id;
        products[index] = product;

        const writeOk = await this.writeProductsData(products);
        if (!writeOk) {
            return null;
        }
        return product;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async deleteProduct (id) {
        const products = await this.readProductsData();

        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }
        const removedProduct = products.splice(index, 1)[0];
        const writeOk = await this.writeProductsData(products);
        if (!writeOk) {
            return null;
        }
        return removedProduct;
    };

}


export default ProductModelFile;
