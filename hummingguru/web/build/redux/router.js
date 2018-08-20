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
    stack: ['helpOthers']
};
function push(route) {
    return {
        type: 'ROUTE_PUSH',
        payload: route
    };
}
exports.push = push;
function pop() {
    return {
        type: 'ROUTE_POP',
    };
}
exports.pop = pop;
function replace(route) {
    return {
        type: 'ROUTE_REPLACE',
        payload: route
    };
}
exports.replace = replace;
exports.actions = {
    push: push,
    pop: pop,
    replace: replace
};
var reducers = {
    ROUTE_PUSH: function (state, action) { return (__assign({}, state, { stack: state.stack.concat([action.payload]) })); },
    ROUTE_POP: function (state) { return (__assign({}, state, { stack: state.stack.slice(0, state.stack.length - 1).slice() })); },
    ROUTE_REPLACE: function (state, action) { return (__assign({}, state, { stack: [action.payload] })); }
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
});
