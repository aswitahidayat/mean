"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const TestSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    type: Number,
});
const TestModel = mongoose.model('Test', TestSchema);
exports.default = TestModel;
