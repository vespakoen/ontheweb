"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    page: 'login'
};
function navigateTo(page) {
    return {
        type: 'NAVIGATE_TO',
        payload: page
    };
}
exports.navigateTo = navigateTo;
exports.actions = {
    navigateTo: navigateTo
};
var reducers = {
    NAVIGATE_TO: function (state, action) { return (__assign({}, state, { page: action.payload })); }
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
});
