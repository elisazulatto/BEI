import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const MONGODB_URI = 'mongodb://localhost:27017/BEI';

async function checkProducts() {
    try {
        // Conectar a MongoDB
        console.log('🔌 Conectando a MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conectado a MongoDB\n');

        // Contar productos
        const totalProducts = await Product.countDocuments();
        console.log(`📦 Total de productos en la base de datos: ${totalProducts}\n`);

        if (totalProducts === 0) {
            console.log('⚠️  No hay productos en la base de datos.');
            console.log('💡 Puedes agregar productos usando: POST /api/products\n');
        } else {
            // Obtener todos los productos
            const products = await Product.find().lean();
            console.log('📋 Productos encontrados:\n');
            
            products.forEach((product, index) => {
                console.log(`${index + 1}. ${product.title}`);
                console.log(`   ID: ${product._id}`);
                console.log(`   Código: ${product.code}`);
                console.log(`   Precio: $${product.price}`);
                console.log(`   Categoría: ${product.category || 'N/A'}`);
                console.log(`   Stock: ${product.stock}`);
                console.log(`   Estado: ${product.status ? 'Disponible' : 'No disponible'}`);
                console.log('');
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('ECONNREFUSED')) {
            console.error('\n💡 Asegúrate de que MongoDB esté corriendo en localhost:27017');
        }
        process.exit(1);
    }
}

checkProducts();

