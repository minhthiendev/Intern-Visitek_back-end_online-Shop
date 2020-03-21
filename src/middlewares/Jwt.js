const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
async function verifiToken(req, res, next) {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const tokenjwt = bearer[1];

        req.token = tokenjwt;
        try {
            const decode = jwt.verify(req.token, 'privatekey');
            req.user = await User.findById(decode.id);
            if (!req.user) {
                res.sendStatus(403)
            }
            next();
        } catch (error) {
            res.sendStatus(403)
        }
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }

}

module.exports = {
    verifiToken: verifiToken
}