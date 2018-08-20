"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var store_1 = __importDefault(require("./store"));
var react_redux_1 = require("react-redux");
var App_1 = __importDefault(require("./components/App"));
function getAppEl() {
    var appEl = document.getElementById('app');
    if (!appEl) {
        appEl = document.createElement('div');
        document.body.appendChild(appEl);
    }
    return appEl;
}
function resetStyle() {
    var resetEl = document.getElementById('reset');
    if (!resetEl) {
        resetEl = document.createElement('style');
        resetEl.type = 'text/css';
        resetEl.innerHTML = "* { margin: 0; padding: 0; } html, body { width: 100%; height: 100%; }";
        document.body.appendChild(resetEl);
    }
}
resetStyle();
react_dom_1.default.render((react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
    react_1.default.createElement(App_1.default, null))), getAppEl());
