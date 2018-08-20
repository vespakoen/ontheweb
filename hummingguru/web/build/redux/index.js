"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var recorder_1 = __importDefault(require("./recorder"));
var helpOthers_1 = __importDefault(require("./helpOthers"));
var login_1 = __importDefault(require("./login"));
var requests_1 = __importDefault(require("./requests"));
var router_1 = __importDefault(require("./router"));
exports.default = redux_1.combineReducers({
    recorder: recorder_1.default,
    helpOthers: helpOthers_1.default,
    login: login_1.default,
    requests: requests_1.default,
    router: router_1.default
});
