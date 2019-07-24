"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require('dotenv').config();
require('./config/passport')(passport);
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const db = String((process.env.NODE_ENV === 'production') ? process.env.PROD_DB : process.env.DEV_DB);
mongoose.connect(db, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
});
/**
 * Set up our express application
 * */
app.use(express.static('public'));
app.use(express.static('files'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
/**
 * Set up for passport authentication
 * */
app.use(session({
    secret: String(process.env.JWT_SECRET),
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
}));
// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
/**
 * Set up routes
 * */
const routes = require('./api/routes/apiRoutes');
routes(app, passport);
app.listen(port);
console.log('RESTful API server started on: ' + port);
