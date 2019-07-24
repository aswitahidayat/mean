"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testModel = require("../models/testModel");
const userModel_1 = require("../models/userModel");
const testController_1 = require("./testController");
const userController_1 = require("./userController");
const jwt = require("jsonwebtoken");
module.exports = (passport) => {
    const testCtrl = new testController_1.default(testModel.default);
    const userCtrl = new userController_1.default(userModel_1.UserModule);
    const publicModule = {};
    /**
     * Session based login functionality
     * */
    publicModule.session_login_post = (req, res, next) => {
        passport.authenticate('local-login', { session: true }, (err, user, info) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({ success: false, message: 'login failed' });
            }
            req.login(user, { session: true }, (err2) => {
                if (err2) {
                    res.send(err2);
                }
                return res.json({ success: true, user });
            });
        })(req, res);
    };
    /**
     * JWT token based login functionality
     * */
    publicModule.jwt_login_post = (req, res, next) => {
        passport.authenticate('local-login', { session: false }, (err, user, info) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({ success: false, message: 'login failed' });
            }
            console.log('Secret is: ', process.env.JWT_SECRET);
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), String(process.env.JWT_SECRET), { expiresIn: "1h" });
            return res.json({ success: true, user, token, expiresIn: 3600 });
        })(req, res);
    };
    /**
     * Sign up tool
     * */
    publicModule.signup_post = (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({ success: false, message: 'signup failed' });
            }
            return res.send({ success: true, message: 'signup succeeded' });
        })(req, res);
    };
    publicModule.logout_get = (req, res) => {
        req.logout();
        res.redirect('/home');
    };
    publicModule.isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
    publicModule.get_user = (req, res, next) => {
        userCtrl.get(req, res);
    };
    /**
     * If doing a JWT validation use the follwoing before the api call
     * */
    publicModule.isJWTValid = (req, res, next) => {
        passport.authenticate('jwt', { session: false })(req, res, next);
    };
    /**
     * Test examples for api callback functions
     * */
    publicModule.test_get = (req, res) => {
        testCtrl.getAll(req, res);
    };
    publicModule.test_post = (req, res) => {
        testCtrl.insert(req, res);
    };
    publicModule.test_delete = (req, res) => {
        testCtrl.delete(req, res);
    };
    /**
     * ============================================
     * */
    return publicModule;
};
