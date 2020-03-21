const Cart = require('../models/cart');
const moment = require('moment')


function getYYYYMMDD(date) {
    let d = new Date(date)
    let y = d.getFullYear();
    let m = ((d.getMonth() + 1).toString().length > 1) ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    let day = (d.getDate().toString().length > 1) ? d.getDate() : '0' + d.getDate();
    return (y + '-' + m + '-' + day)
}
module.exports.checkCart15day = (req, res, next) => {
    try {
        Cart.find({}, (err, docs) => {
            if (docs) {
                docs.forEach(x => {
                    if (moment().diff(moment(getYYYYMMDD(x.date), "YYYYMMDD"), 'days') > 15) {
                        Cart.findById(x._id, (err, doc) => {
                            doc.remove();
                        })
                    }
                })
                next();
            }
            next();
        })
    } catch (error) {
        return res.json({ message: error })
    }
}
