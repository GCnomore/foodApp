"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql_1 = __importDefault(require("mysql"));
var app = express_1.default();
var add = function (a, b) { return a + b; };
app.get("/", function (req, res, next) {
    console.log(add(3, 4));
    res.send("hello world");
});
app.listen(5000, function () { return console.log("server running"); });
var connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "gkskfh12",
    database: "testing1",
    insecureAuth: true,
});
connection.connect();
connection.query("SELECT * FROM user", function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});
connection.end();
