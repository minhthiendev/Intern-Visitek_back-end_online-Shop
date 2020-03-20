const jwt = require('jsonwebtoken');
const User = require('../models/user')
module.exports.IsAdmin = (req, res, next) => {
    jwt.verify(req.token, 'privatekey', (err, authdata) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (req.user.role == "admin") {
                next();
            } else {
                res.sendStatus(403);
            }
        }
    })
};
