"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// HUMMS
function getHumm(id) {
    return utils_1.getJson("api/humms/" + id);
}
exports.getHumm = getHumm;
function createHumm(humm) {
    return utils_1.postJson('api/humms', humm);
}
exports.createHumm = createHumm;
function updateHumm(humm) {
    return utils_1.putJson('api/humms', humm);
}
exports.updateHumm = updateHumm;
function createComment(hummId, comment) {
    return utils_1.postJson("api/humms/" + hummId + "/comments", comment);
}
exports.createComment = createComment;
function updateComment(hummId, commentId, update) {
    return utils_1.putJson("api/humms/" + hummId + "/comments/" + commentId, update);
}
exports.updateComment = updateComment;
function markCommentAsAnswer(hummId, commentId) {
    var update = { answer: true };
    return updateComment(hummId, commentId, update);
}
exports.markCommentAsAnswer = markCommentAsAnswer;
// USERS
function createFacebookUser(facebookProfile) {
    return utils_1.postJson('api/users/facebook', facebookProfile);
}
exports.createFacebookUser = createFacebookUser;
function getUserByFacebookId(facebookId) {
    return utils_1.getJson("api/users/facebook/" + facebookId);
}
exports.getUserByFacebookId = getUserByFacebookId;
function createGuestUser(guestProfile) {
    return utils_1.postJson('api/users/guest', guestProfile);
}
exports.createGuestUser = createGuestUser;
function getUserByDeviceId(deviceId) {
    return utils_1.getJson("api/users/guest/" + deviceId);
}
exports.getUserByDeviceId = getUserByDeviceId;
function getNextHummForUser(userId) {
    return utils_1.getJson("api/users/" + userId + "/nexthumm");
}
exports.getNextHummForUser = getNextHummForUser;
function getCurrentHummForUser(userId) {
    return utils_1.getJson("api/users/" + userId + "/currenthumm");
}
exports.getCurrentHummForUser = getCurrentHummForUser;
// REQUESTS
function getRequests(userId) {
    return utils_1.getJson("api/users/" + userId + "/requests");
}
exports.getRequests = getRequests;
