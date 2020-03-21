const Cart_Db = require('../models/cart');
const Products = require('../models/products');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

async function AddtoCart(req, res, next) {
    let cart = req.session.cart || [];
    try {
        let productId = req.params.id;
        let exist = false;
        cart.map((item) => {
            if (item.product === productId) {
                item.quantity++;
                exist = true;
            }
        })
        if (exist == false) {
            const product = await Products.findById(productId);
            if (!product) return res.status(404).json({ success: false, msg: "Product not found" });

            cart.push({
                product: product._id,
                quantity: 1
            });
        }
        req.session.cart = cart;
        res.status(201).json({ success: true, data: req.session.cart })

    } catch (error) {
        res.json(error);
    }
};


function showCart(req, res) {

    try {
        if (req.session.cart) {
            return res.json({
                status: true,
                carts: req.session.cart
            })
        }
        res.json({
            messsage: " no products in your cart"
        })
    } catch (error) {
        return res.json({
            messsage: error
        })
    }
}

const saveCart = async (req, res) => {
    let today = new Date();
    if (req.session.cart) {
        let c = new Cart_Db({
            user: req.user._id,
            products: req.session.cart,
            date: Date.parse(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
            //date: today.getDate()
        })
        const cart = await Cart_Db.findOne({ user: req.user._id });

        if (!cart) {
            const x = await c.save().then()
            if (x) {
                return res.json({
                    status: true,
                    data: x
                })
            }
        }
        const y = await Cart_Db.findOneAndUpdate({ user: req.user._id }, {
            products: req.session.cart,
            date: Date.parse(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
        });
        if (y) {
            return res.json({
                status: true,
                data: y
            })
        }

    }
    return res.json({
        messsage: " can't save"
    })
}

module.exports = {
    AddtoCart: AddtoCart,
    showCart: showCart,
    saveCart: saveCart
}
