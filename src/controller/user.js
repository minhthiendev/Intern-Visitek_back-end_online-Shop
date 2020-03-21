const User = require("../models/user");
const Mail = require("../middlewares/sendMail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortId = require('shortid');
let mailToken;

async function signUp(req, res) {
    try {
        let { name, sdt, email, password, status } = req.body;
        await User.findOne({ email: email }, async (err, user) => {
            if (user) {
                if (user.active == "false") {
                    res.json({ messsage: "Your account  has not been authenticated " });
                } else {
                    res.json({ messsage: "this email is realy existed !!" });
                }
            } else {
                await User.create({
                    name: name,
                    phone: sdt,
                    email: email,
                    password: bcrypt.hashSync(password, 10)
                }).then(val => {
                    mailToken = req.session.mailToken = val._id
                    console.log("2:", req.session.mailToken)
                    Mail(val.email, mailToken);
                    res.json({
                        messsage: "successfully ---you must check mail to active your account",
                        token: mailToken
                    })
                })
            }
        })

    } catch (error) {
        res.sendStatus(404)
    }

}

function checkedMail(req, res) {
    try {
        User.findOneAndUpdate({ _id: id }, { active: true }).then(raw => {
            res.json({
                messsage: "successfully",
                raw: raw
            })
        })
    } catch (error) {
        res.sendStatus(404)
    }

}

// ----------------------------end sign up--------------------------------------

function signIn(req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (bcrypt.compareSync(password, user.password)) {
            jwt.sign({ id: user._id }, "privatekey", { expiresIn: "1h" }, (err, token) => {
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
        User.findOneAndUpdate({ _id: authdata.user._id }, { password: bcrypt.hashSync(req.body.new_password, 10) }, (err, doc) => {
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
    checkedMail: checkedMail,
    signUp: signUp,
    signIn: signIn,
    changePassword: changePassword,
    mailToken: mailToken
};
