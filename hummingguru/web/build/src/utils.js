"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var react_native_1 = require("react-native");
function isIphoneX() {
    var dimen = react_native_1.Dimensions.get('window');
    return (react_native_1.Platform.OS === 'ios' &&
        !react_native_1.Platform.isPad &&
        !react_native_1.Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812));
}
exports.isIphoneX = isIphoneX;
function createJsonFetcher(method) {
    return function (uri, json) {
        var opts = {};
        if (method !== 'GET') {
            opts = {
                method: method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(json)
            };
        }
        return fetch(config_1.default.API_URL + "/" + uri, opts)
            .then(function (res) {
            if (res.status >= 400 && res.status < 600) {
                return res.json()
                    .then(function (res) {
                    throw new Error("Bad response from server: " + res.error);
                });
            }
            return res;
        })
            .then(function (res) { return res.json(); });
    };
}
exports.getJson = createJsonFetcher('GET');
exports.postJson = createJsonFetcher('POST');
exports.putJson = createJsonFetcher('PUT');
