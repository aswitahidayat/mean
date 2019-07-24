"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = require("./baseController");
/**
 * User class
 * */
class UserClass extends baseController_1.default {
    constructor(model) {
        super(model);
    }
    get(req, res) {
        this.model.findOne({ _id: req.params.userId }, (err, obj) => {
            if (err) {
                return console.error(err);
            }
            res.json(obj);
        });
    }
}
exports.default = UserClass;
