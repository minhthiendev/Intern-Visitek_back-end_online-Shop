const nodemailer = require('nodemailer');

module.exports = (receiver, token) => {
  this.transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.emailShop, // generated ethereal user
      pass: process.env.passwordEmailShop // generated ethereal password
    }
  });

  this.mailOption = {
    from: process.env.emailShop, // sender address
    to: receiver, // list of receivers
    subject: "Conform Email", // Subject line
    html: `Please click  this email to conform your email : <a href ="http://localhost:3000/api/confirm/${token}" >Confirm</a>`  //  authenticate code
  };
  this.send = this.transporter.sendMail(this.mailOption, (err, info) => {
    if (err) throw err;
    else (
      Console.log('Auth code is sent to', receiver)
    )
  })
}

