function verifiToken(req, res, next) {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const tokenjwt = bearer[1];

        req.token = tokenjwt;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

module.exports = {
    verifiToken: verifiToken
}