import mongoose from 'mongoose';
import config from '../../config.js';

class MongoDB {

    static READY_STATE_DISCONNECTED = 0;
    static READY_STATE_CONNECTED = 1;
    static READY_STATE_CONNECTING = 2;
    static READY_STATE_DISCONNECTING = 3;   

    static connectDB = async () => {
        try {
            if (mongoose.connection.readyState === MongoDB.READY_STATE_CONNECTED) {
                return true;
            }
            await mongoose.connect(config.mongodbConnectionStr, {
                serverSelectionTimeoutMS: config.mongodbTimeout,
            });
            console.log('Conexión con MongoDB exitosa');
            return true;
        } catch (error) {
            console.error('Error al establecer la conexión con MongoDB:', error.message);
            return false;
        }
    };
   
}

export default MongoDB;
