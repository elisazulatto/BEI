import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: String,
        trim: true
    },
    thumbnails: {
        type: [String],
        default: []
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const Product = mongoose.model('Product', productSchema);

export default Product;

