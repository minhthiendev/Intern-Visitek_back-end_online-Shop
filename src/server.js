const express = require('express');
const router = require('./routes/route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const path = require('path')
const listEndpoints = require('express-list-endpoints');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;
mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: "secret string",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));
app.use(cookieParser(process.env.secret));

app.use('/api', router);


app.listen(port, () => {
    console.log(listEndpoints(app));
    console.log(`Server onlineShop is listening on port ${port}!`);
});