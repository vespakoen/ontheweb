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
// import FBSDK, {
//   LoginManager,
//   AccessToken
// } from 'react-native-fbsdk'
// import uniqueId from 'react-native-unique-id'
var fb = __importStar(require("../fb"));
var api = __importStar(require("../api"));
var initialState = {
    isLoggedIn: false,
    isFetchingProfile: false,
    isFetchingUser: false
};
function uniqueId() {
    var deviceId = window.localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = Math.random() + '';
        window.localStorage.setItem('deviceId', deviceId);
    }
    return Promise.resolve(deviceId);
}
function getUserByFacebookId(profile) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_USER'
        });
        api.getUserByFacebookId(profile.id)
            // when not found, create a new user
            .catch(function () { return api.createFacebookUser(profile); })
            .then(function (user) {
            dispatch({
                type: 'FETCH_USER_SUCCESS',
                payload: user
            });
        })
            .catch(function (err) { return dispatch({
            type: 'FETCH_USER_ERROR',
            payload: err.message
        }); });
    };
}
exports.getUserByFacebookId = getUserByFacebookId;
function getUserByDeviceId() {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_USER'
        });
        uniqueId()
            .then(function (deviceId) {
            return api.getUserByDeviceId(deviceId)
                // when not found, create a new user
                .catch(function () { return api.createGuestUser({
                deviceId: deviceId
            }); })
                .then(function (user) {
                dispatch({
                    type: 'FETCH_USER_SUCCESS',
                    payload: user
                });
                dispatch({
                    type: 'LOGIN_SUCCESS'
                });
            })
                .catch(function (err) {
                console.error(err);
                dispatch({
                    type: 'FETCH_USER_ERROR',
                    payload: err.message
                });
            });
        });
    };
}
exports.getUserByDeviceId = getUserByDeviceId;
function fetchProfile() {
    return function (dispatch, getState) {
        var state = getState();
        dispatch({
            type: 'FETCH_PROFILE'
        });
        fb.getProfile(state.login.accessToken)
            .then(function (profile) {
            dispatch({
                type: 'FETCH_PROFILE_SUCCESS',
                payload: profile
            });
            dispatch(getUserByFacebookId(profile));
        })
            .catch(function (err) { return dispatch({
            type: 'FETCH_PROFILE_ERROR',
            payload: err
        }); });
    };
}
exports.fetchProfile = fetchProfile;
function facebookLogin() {
    return function (dispatch) {
        dispatch({
            type: 'LOGIN'
        });
        // LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        //   .then(result => {
        //     if (result.isCancelled) {
        //       dispatch({
        //         type: 'LOGIN_CANCELLED'
        //       })
        //     } else {
        //       AccessToken.getCurrentAccessToken()
        //         .then(data => {
        //           const accessToken = data.accessToken.toString()
        //           dispatch({
        //             type: 'LOGIN_SUCCESS',
        //             payload: accessToken
        //           })
        //           dispatch(fetchProfile())
        //         })
        //     }
        //   })
        //   .catch(err => dispatch({
        //     type: 'LOGIN_FAILED',
        //     payload: err
        //   }))
    };
}
exports.facebookLogin = facebookLogin;
function guestLogin() {
    return function (dispatch) {
        dispatch({
            type: 'LOGIN'
        });
        dispatch(getUserByDeviceId());
    };
}
exports.guestLogin = guestLogin;
exports.actions = {
    facebookLogin: facebookLogin,
    guestLogin: guestLogin
};
var reducers = {
    LOGIN: function (state) { return (__assign({}, state, { isLoggingIn: true })); },
    LOGIN_SUCCESS: function (state, action) { return (__assign({}, state, { isLoggedIn: true, accessToken: action.payload })); },
    LOGIN_CANCELLED: function (state) { return (__assign({}, state, { isLoggingIn: false })); },
    LOGIN_FAILED: function (state, action) { return (__assign({}, state, { isLoggingIn: false, error: action.payload })); },
    FETCH_PROFILE: function (state) { return (__assign({}, state, { isFetchingProfile: true })); },
    FETCH_PROFILE_SUCCESS: function (state) { return (__assign({}, state, { isFetchingProfile: false })); },
    FETCH_PROFILE_ERROR: function (state, action) { return (__assign({}, state, { isFetchingProfile: false, error: action.payload })); },
    FETCH_USER: function (state) { return (__assign({}, state, { isFetchingUser: true })); },
    FETCH_USER_SUCCESS: function (state, action) { return (__assign({}, state, { isFetchingUser: false, user: action.payload })); },
    FETCH_USER_ERROR: function (state, action) { return (__assign({}, state, { isFetchingUser: false, error: action.payload })); }
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
});
