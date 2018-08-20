"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var login_1 = require("../redux/login");
var Login = function (props) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Login"),
        react_1.default.createElement("a", { href: "#", onClick: function () { return props.guestLogin(); } }, "Guest login")));
};
exports.default = react_redux_1.connect(function (state) { return state; }, login_1.actions)(Login);
