const mongoose = require('mongoose');

let schema = mongoose.Schema;
let cart_schema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quatity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        expires: '1m'
    }
})

module.exports = mongoose.model('Cart', cart_schema);

