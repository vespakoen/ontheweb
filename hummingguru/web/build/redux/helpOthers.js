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
    humm: null,
    isLoading: true,
    isCommenting: false,
    isSendingComment: false,
    sendCommentError: null
};
function getNextHumm() {
    return function (dispatch, getState) {
        var state = getState();
        dispatch({
            type: 'FETCH_NEXT_HUMM'
        });
        api.getNextHummForUser(state.login.user.id)
            .then(function (nextHumm) { return dispatch({
            type: 'FETCH_NEXT_HUMM_SUCCESS',
            payload: nextHumm
        }); })
            .catch(function (err) { return dispatch({
            type: 'FETCH_NEXT_HUMM_ERROR',
            payload: err.message
        }); });
    };
}
exports.getNextHumm = getNextHumm;
function getCurrentHumm() {
    return function (dispatch, getState) {
        var state = getState();
        dispatch({
            type: 'FETCH_CURRENT_HUMM'
        });
        api.getCurrentHummForUser(state.login.user.id)
            .then(function (currentHumm) { return dispatch({
            type: 'FETCH_CURRENT_HUMM_SUCCESS',
            payload: currentHumm
        }); })
            .catch(function (err) { return dispatch({
            type: 'FETCH_CURRENT_HUMM_ERROR',
            payload: err.message
        }); });
    };
}
exports.getCurrentHumm = getCurrentHumm;
function commentOnHumm() {
    return {
        type: 'COMMENT_ON_HUMM'
    };
}
exports.commentOnHumm = commentOnHumm;
function setComment(comment) {
    return {
        type: 'SET_COMMENT',
        payload: comment
    };
}
exports.setComment = setComment;
function sendComment() {
    return function (dispatch, getState) {
        var state = getState();
        dispatch({
            type: 'SEND_COMMENT'
        });
        api.createComment(state.helpOthers.humm.id, {
            userId: state.login.user.id,
            comment: state.helpOthers.comment
        })
            .then(function () { return dispatch({
            type: 'SEND_COMMENT_SUCCESS'
        }); })
            .catch(function (err) { return dispatch({
            type: 'SEND_COMMENT_ERROR',
            payload: err.message
        }); });
    };
}
exports.sendComment = sendComment;
exports.actions = {
    getNextHumm: getNextHumm,
    getCurrentHumm: getCurrentHumm,
    commentOnHumm: commentOnHumm,
    setComment: setComment,
    sendComment: sendComment
};
var reducers = {
    FETCH_CURRENT_HUMM: function (state) { return (__assign({}, state, { isLoading: true })); },
    FETCH_NEXT_HUMM: function (state) { return (__assign({}, state, { isLoading: true })); },
    FETCH_NEXT_HUMM_SUCCESS: function (state, action) { return (__assign({}, state, { humm: action.payload, isLoading: false })); },
    FETCH_NEXT_HUMM_ERROR: function (state, action) { return (__assign({}, state, { humm: null, error: action.payload, isLoading: false })); },
    FETCH_CURRENT_HUMM_SUCCESS: function (state, action) { return (__assign({}, state, { humm: action.payload, isLoading: false })); },
    FETCH_CURRENT_HUMM_ERROR: function (state, action) { return (__assign({}, state, { humm: null, error: action.payload, isLoading: false })); },
    COMMENT_ON_HUMM: function (state, action) { return (__assign({}, state, { isCommenting: true })); },
    SET_COMMENT: function (state, action) { return (__assign({}, state, { comment: action.payload })); },
    SEND_COMMENT: function (state, action) { return ({
        isSendingComment: true
    }); },
    SEND_COMMENT_SUCCESS: function (state, action) { return ({
        isSendingComment: false,
        isCommenting: false,
        comment: '',
        sendCommentError: null
    }); },
    SEND_COMMENT_ERROR: function (state, action) { return ({
        isSendingComment: false,
        sendCommentError: action.payload
    }); },
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
});
