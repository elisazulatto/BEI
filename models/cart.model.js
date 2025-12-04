import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
}, {
    _id: false // No crear _id para los items del array
});

const cartSchema = new mongoose.Schema({
    products: {
        type: [cartItemSchema],
        default: []
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

