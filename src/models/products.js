const mongoose = require('mongoose');

let schema = mongoose.Schema;
let Product_schema = new schema({
    sku: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Product', Product_schema);

