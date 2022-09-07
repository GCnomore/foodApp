"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = __importDefault(require("../loaders/logger"));
var Information_1 = __importDefault(require("./routes/Information"));
var Recipes_1 = __importDefault(require("./routes/Recipes"));
function AppRouters() {
    var app = express_1.Router();
    Recipes_1.default(app);
    Information_1.default(app);
    logger_1.default.info("routers injected");
    return app;
}
exports.default = AppRouters;
