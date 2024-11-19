import 'dotenv/config';

const config = {
    appPort:                process.env.APP_PORT || 8080,
    appPersistenceType:     process.env.APP_PERSISTENCE_TYPE || 'MEMORY',
    mongodbTimeout:         process.env.MONGODB_TIMEOUT || 10000,
    mongodbConnectionStr:   process.env.MONGODB_CONNECTION_STR || 'mongodb://127.0.0.1:27017/ecommerce',
};

export default config;
