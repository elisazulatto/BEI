import mongoose from 'mongoose';

// Configuración de la base de datos
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BEI';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB conectado exitosamente');
        console.log(`📦 Base de datos: BEI`);
        console.log(`🔗 URI: ${MONGODB_URI}`);
        return true;
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        console.log('💡 Asegúrate de que MongoDB esté corriendo en localhost:27017');
        throw error;
    }
};

export default connectDB;

