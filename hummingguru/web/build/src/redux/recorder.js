"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_audio_1 = require("react-native-audio");
var react_native_background_upload_1 = __importDefault(require("react-native-background-upload"));
var react_native_fs_1 = __importDefault(require("react-native-fs"));
var api = __importStar(require("../api"));
var config_1 = __importDefault(require("../../config"));
var initialState = {
    isRecording: false,
    isRecordingPaused: false,
    isPlaying: false,
    isPlaybackPaused: false,
    isRecordingAccepted: false,
    progress: 0,
    recordingId: null,
    note: null
};
var tmpFile = react_native_fs_1.default.DocumentDirectoryPath + "/humm.aac";
console.log(tmpFile);
function listenToProgress() {
    return function (dispatch) {
        react_native_audio_1.AudioRecorder.onProgress = function (data) {
            dispatch({
                type: 'PROGRESS',
                payload: data.currentTime
            });
        };
    };
}
exports.listenToProgress = listenToProgress;
function listenToFinish() {
    return function (dispatch) {
        react_native_audio_1.AudioRecorder.onFinished = function () {
            dispatch({
                type: 'UPLOAD'
            });
            react_native_background_upload_1.default.startUpload({
                url: config_1.default.API_URL + "/upload",
                path: tmpFile,
                method: 'POST',
                type: 'multipart',
                field: 'file',
                headers: {
                    'content-type': 'application/octet-stream'
                },
            }).then(function (uploadId) {
                console.log('Upload started');
                react_native_background_upload_1.default.addListener('progress', uploadId, function (data) {
                    console.log("Progress: " + data.progress + "%");
                    dispatch({
                        type: 'UPLOAD_PROGRESS',
                        payload: data.progress
                    });
                });
                react_native_background_upload_1.default.addListener('error', uploadId, function (data) {
                    console.log("Error: " + data.error + "%");
                    dispatch({
                        type: 'UPLOAD_ERROR',
                        payload: data.error
                    });
                });
                react_native_background_upload_1.default.addListener('cancelled', uploadId, function (data) {
                    console.log("Cancelled!");
                });
                react_native_background_upload_1.default.addListener('completed', uploadId, function (data) {
                    react_native_fs_1.default.unlink(tmpFile)
                        .catch(function (unlinkErr) { return console.error("unlink error: " + unlinkErr.message); })
                        .then(function () { return dispatch({
                        type: 'UPLOAD_SUCCESS',
                        payload: data.responseBody
                    }); });
                });
            }).catch(function (err) {
                console.log('Upload error!', err);
            });
        };
    };
}
exports.listenToFinish = listenToFinish;
function stopRecording() {
    react_native_audio_1.AudioRecorder.stopRecording();
    return {
        type: 'STOP_RECORDING'
    };
}
exports.stopRecording = stopRecording;
function startRecording() {
    return function (dispatch, getState) {
        var state = getState();
        if (state.recorder.isRecording) {
            dispatch(stopRecording());
        }
        react_native_audio_1.AudioRecorder.prepareRecordingAtPath(tmpFile, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
            AudioEncodingBitRate: 32000
        });
        react_native_audio_1.AudioRecorder.startRecording();
        dispatch({
            type: 'START_RECORDING'
        });
    };
}
exports.startRecording = startRecording;
function pauseRecording() {
    react_native_audio_1.AudioRecorder.pauseRecording();
    return {
        type: 'PAUSE_RECORDING'
    };
}
exports.pauseRecording = pauseRecording;
function startPlaying() {
    react_native_audio_1.AudioRecorder.playRecording();
    return {
        type: 'START_PLAYING'
    };
}
exports.startPlaying = startPlaying;
function pausePlaying() {
    react_native_audio_1.AudioRecorder.pausePlaying();
    return {
        type: 'PAUSE_PLAYING'
    };
}
exports.pausePlaying = pausePlaying;
function stopPlaying() {
    react_native_audio_1.AudioRecorder.stopPlaying();
    return {
        type: 'STOP_PLAYING'
    };
}
exports.stopPlaying = stopPlaying;
function acceptRecording() {
    return {
        type: 'ACCEPT_RECORDING'
    };
}
exports.acceptRecording = acceptRecording;
function declineRecording() {
    return {
        type: 'DECLINE_RECORDING'
    };
}
exports.declineRecording = declineRecording;
function setNote(note) {
    return {
        type: 'SET_NOTE',
        payload: note
    };
}
exports.setNote = setNote;
function createHumm() {
    return function (dispatch, getState) {
        var state = getState();
        dispatch({
            type: 'CREATE_HUMM'
        });
        var humm = {
            userId: state.login.user.id,
            recordingId: state.recorder.recordingId,
            note: state.recorder.note
        };
        api.createHumm(humm)
            .then(function () {
            dispatch({
                type: 'CREATE_HUMM_SUCCESS'
            });
        })
            .catch(function (err) {
            dispatch({
                type: 'CREATE_HUMM_ERROR',
                payload: err.message
            });
        });
    };
}
exports.createHumm = createHumm;
exports.actions = {
    startRecording: startRecording,
    pauseRecording: pauseRecording,
    stopRecording: stopRecording,
    startPlaying: startPlaying,
    pausePlaying: pausePlaying,
    stopPlaying: stopPlaying,
    listenToProgress: listenToProgress,
    listenToFinish: listenToFinish,
    acceptRecording: acceptRecording,
    declineRecording: declineRecording,
    setNote: setNote,
    createHumm: createHumm
};
var reducers = {
    START_RECORDING: function (state) { return (__assign({}, state, { isRecording: true, isRecordingPaused: false })); },
    PAUSE_RECORDING: function (state) { return (__assign({}, state, { isRecordingPaused: true })); },
    STOP_RECORDING: function (state) { return (__assign({}, state, { progress: 0, isRecording: false, isRecordingPaused: false })); },
    START_PLAYING: function (state) { return (__assign({}, state, { isPlaying: true, isPlaybackPaused: false })); },
    PAUSE_PLAYING: function (state) { return (__assign({}, state, { isPlaybackPaused: true })); },
    STOP_PLAYING: function (state) { return (__assign({}, state, { isPlaying: false, isPlaybackPaused: false })); },
    PROGRESS: function (state, action) { return (__assign({}, state, { progress: action.payload })); },
    UPLOAD: function (state) { return (__assign({}, state, { isUploading: true })); },
    UPLOAD_SUCCESS: function (state, action) { return (__assign({}, state, { recordingId: action.payload, uploadProgress: 0, isUploading: false })); },
    UPLOAD_ERROR: function (state, action) { return (__assign({}, state, { error: action.payload, uploadProgress: 0, isUploading: false })); },
    UPLOAD_PROGRESS: function (state, action) { return (__assign({}, state, { uploadProgress: action.payload })); },
    ACCEPT_RECORDING: function (state) { return (__assign({}, state, { isRecordingAccepted: true })); },
    DECLINE_RECORDING: function (state) { return (__assign({}, state, { isRecordingAccepted: false, recordingId: null })); },
    SET_NOTE: function (state, action) { return (__assign({}, state, { note: action.payload })); },
    CREATE_HUMM_SUCCESS: function (state) { return (__assign({}, state, { recordingId: null, note: null, isRecordingAccepted: false })); }
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
});
