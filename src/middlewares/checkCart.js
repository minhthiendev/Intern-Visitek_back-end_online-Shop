const Cart = require('../models/cart');
module.exports.check15day = (req, res, next) => {
    let today = new Date();

    Cart.find({}, (err, docs) => {
        console.log(docs);
        if (docs) {
            return res.json({ data: docs })
        }
        return res.json({ today: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() })
    })

}
