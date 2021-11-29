"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var recipes_1 = __importDefault(require("./routes/recipes"));
exports.default = (function () {
    var app = express_1.Router();
    recipes_1.default(app);
    return app;
});
