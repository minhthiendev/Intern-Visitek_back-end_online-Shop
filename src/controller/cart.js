const Cart_Db = require('../models/cart');
const Products = require('../models/products');
let price = (id) => {
    Products.findOne({ _id: id }).then(pro => price = pro.Price);
}
function Cart(cart) {
    this.products = cart.products || [];
    this.totalPrice = cart.totalPrice || 0;
    this.add = function (product, id) {
        let temp_product = this.products.find(element => element.id == id);

        if (!temp_product) {
            let temp;
            Products.findOne({ _id: id }, (err, pro) => {
                temp = pro.price;
            });
            temp_product = { id: id, quantity: 1, price: temp }
            this.products.push(temp_product);
            this.totalPrice += temp_product.quantity * temp_product.price;

        } else {
            let index = this.products.indexOf(temp_product);
            ++temp_product.quantity;
            temp_product.date = Date.now;

            this.products.splice(index, 1, temp_product);
            this.totalPrice = this.products.reduce((a, b) => a + (b.price * b.quantity), 0);

        }

    }
    this.date = Date.now();


    this.getCart = () => {
        return this.products;
    }

};

function AddtoCart(req, res) {
    let id = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {})
    req.session.cart = cart;

    Products.findById(id, (err, product) => {
        if (product) {
            cart.add(product, product._id);
            res.status(200).json({ data: cart });
            req.session.cart = cart;
        }
    })

}

function showCart(req, res) {
    if (!req.session.cart.products) {
        res.json({});
    }
    res.json(req.session.cart.products)
}



module.exports = {
    AddtoCart: AddtoCart,
    showCart: showCart,

}