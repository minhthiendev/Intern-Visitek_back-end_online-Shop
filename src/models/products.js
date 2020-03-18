const mongoose = require('mongoose');

let schema = mongoose.Schema;
let Product_schema = new schema({
    sku: String,
    productName: String,
    category: String,
    price: Number,
    discount: Number,
    image: String
})

module.exports = mongoose.model('Product', Product_schema);

