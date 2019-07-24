"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const UserSchema = new mongoose_1.Schema({
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
});
// generating a hash
UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
// create the model for users and expose it to our app
exports.UserModule = mongoose.model('User', UserSchema);
