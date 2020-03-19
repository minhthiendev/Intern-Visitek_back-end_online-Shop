const User = require("../models/user");
const Mail = require("../middlewares/mailAuth");
const shortId = require("shortid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let e, p, n;
let mailToken = shortId.generate();


function sendMail(req, res) {
    let { name, email, password } = req.body;
    User.findOne({ email: email }, (err, doc) => {
        if (doc) {
            res.json({ messsage: "email is existed !!!" })
        }
        else {
            Mail(email, token);
            n = name;
            e = email;
            p = bcrypt.hashSync(password, 10);
            res.json({
                messsage: "sending mail",
                data: { n, e, p },
                token: token
            });
        }
    })
}

function signUp_success(req, res) {
    let user = new User({ name: n, email: e, password: p })
    user.save().then(doc => {
        if (doc) {
            res.status(201).json({ status: "success" });
        }
    });
    name = email = pass = null;
}

// ----------------------------end sign up--------------------------------------

function signIn(req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (bcrypt.compareSync(password, user.password)) {
            jwt.sign({ user }, "privatekey", { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    res.json({
                        status: "error",
                        err: err
                    });
                }
                res.json({
                    status: "success",
                    token: token,
                });
            });
        } else {
            res.json({
                status: "ERROR: Could not log in"
            });
        }

    });
}

function changePassword(req, res) {
    jwt.verify(req.token, 'privatekey', (err, authdata) => {
        User.findOneAndUpdate({ _id: authdata._id }, { password: req.body.password }, (err, doc) => {
            if (err) throw err;
            if (doc) {
                res.json({
                    messsage: "success",
                    new_password: doc.password
                });
            }
        })
    })
}

module.exports = {
    sendMail: sendMail,
    signUp_success: signUp_success,
    signIn: signIn,
    changePassword: changePassword,
    mailToken: this.mailToken
};
