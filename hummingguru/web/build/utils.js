"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
function createJsonFetcher(method) {
    return function (uri, json) {
        var opts = {};
        if (method !== 'GET') {
            opts = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            };
        }
        console.log(config_1.default.API_URL + "/" + uri, opts);
        return fetch(config_1.default.API_URL + "/" + uri, opts)
            .then(function (res) {
            if (res.status >= 400 && res.status < 600) {
                return res.json()
                    .then(function (res) {
                    throw new Error("Bad response from server: " + res.error);
                });
            }
            return res.json();
        });
    };
}
exports.getJson = createJsonFetcher('GET');
exports.postJson = createJsonFetcher('POST');
exports.putJson = createJsonFetcher('PUT');
