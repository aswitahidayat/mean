"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = require("./baseController");
/**
 * The following class is for testing purposes
 * the method 'insert' uses 'save' option of mongoose model to save an entry
 * */
class TestClass extends baseController_1.default {
    constructor(model) {
        super(model);
    }
    insert(req, res) {
        const obj = new this.model(req.body);
        obj.save((err, item) => {
            if (err) {
                return console.error(err);
            }
            res.status(200).json(item);
        });
    }
}
exports.default = TestClass;
