"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var api = __importStar(require("../api"));
var initialState = {
    requests: null
};
function getRequests() {
    return function (dispatch, getState) {
        var state = getState();
        dispatch({
            type: 'FETCH_REQUESTS'
        });
        api.getRequests(state.login.user.id)
            .then(function (requests) { return dispatch({
            type: 'FETCH_REQUESTS_SUCCESS',
            payload: requests
        }); })
            .catch(function (err) { return dispatch({
            type: 'FETCH_REQUESTS_ERROR',
            payload: err.message
        }); });
    };
}
exports.getRequests = getRequests;
exports.actions = {
    getRequests: getRequests
};
var reducers = {
    FETCH_REQUESTS: function (state) { return (__assign({}, state, { isLoading: true })); },
    FETCH_REQUESTS_SUCCESS: function (state, action) { return (__assign({}, state, { requests: action.payload, isLoading: false })); },
    FETCH_REQUESTS_ERROR: function (state, action) { return (__assign({}, state, { requests: null, error: action.payload, isLoading: false })); },
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
});
