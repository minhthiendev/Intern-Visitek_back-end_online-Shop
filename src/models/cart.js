const mongoose = require('mongoose');
let schema = mongoose.Schema;
let today = new Date();
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
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.parse(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())

    }
})

module.exports = mongoose.model('Cart', cart_schema);

