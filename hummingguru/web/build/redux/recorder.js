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
// import { AudioRecorder } from 'react-native-audio'
// import Upload from 'react-native-background-upload'
// import fs from 'react-native-fs'
var api = __importStar(require("../api"));
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
// const tmpFile = `${fs.DocumentDirectoryPath}/humm.aac`
// console.log(tmpFile)
function listenToProgress() {
    return function (dispatch) {
        // AudioRecorder.onProgress = (data) => {
        //   dispatch({
        //     type: 'PROGRESS',
        //     payload: data.currentTime
        //   })
        // }
    };
}
exports.listenToProgress = listenToProgress;
function listenToFinish() {
    return function (dispatch) {
        // AudioRecorder.onFinished = () => {
        //   dispatch({
        //     type: 'UPLOAD'
        //   })
        //   Upload.startUpload({
        //     url: `${config.API_URL}/upload`,
        //     // path: tmpFile,
        //     method: 'POST',
        //     type: 'multipart',
        //     field: 'file',
        //     headers: {
        //       'content-type': 'application/octet-stream'
        //     },
        //     // Below are options only supported on Android
        //     // notification: {
        //     //   enabled: true
        //     // }
        //   }).then((uploadId) => {
        //     console.log('Upload started')
        //     Upload.addListener('progress', uploadId, (data) => {
        //       console.log(`Progress: ${data.progress}%`)
        //       dispatch({
        //         type: 'UPLOAD_PROGRESS',
        //         payload: data.progress
        //       })
        //     })
        //     Upload.addListener('error', uploadId, (data) => {
        //       console.log(`Error: ${data.error}%`)
        //       dispatch({
        //         type: 'UPLOAD_ERROR',
        //         payload: data.error
        //       })
        //     })
        //     Upload.addListener('cancelled', uploadId, (data) => {
        //       console.log(`Cancelled!`)
        //     })
        //     Upload.addListener('completed', uploadId, (data) => {
        //       fs.unlink(tmpFile)
        //         .catch(unlinkErr => console.error(`unlink error: ${unlinkErr.message}`))
        //         .then(() => dispatch({
        //           type: 'UPLOAD_SUCCESS',
        //           payload: data.responseBody
        //         }))
        //     })
        //   }).catch((err) => {
        //     console.log('Upload error!', err)
        //   })
        // }
    };
}
exports.listenToFinish = listenToFinish;
function stopRecording() {
    // AudioRecorder.stopRecording()
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
        // AudioRecorder.prepareRecordingAtPath(tmpFile, {
        //   SampleRate: 22050,
        //   Channels: 1,
        //   AudioQuality: 'Low',
        //   AudioEncoding: 'aac',
        //   AudioEncodingBitRate: 32000
        // })
        // AudioRecorder.startRecording()
        dispatch({
            type: 'START_RECORDING'
        });
    };
}
exports.startRecording = startRecording;
function pauseRecording() {
    // AudioRecorder.pauseRecording()
    return {
        type: 'PAUSE_RECORDING'
    };
}
exports.pauseRecording = pauseRecording;
function startPlaying() {
    // AudioRecorder.playRecording()
    return {
        type: 'START_PLAYING'
    };
}
exports.startPlaying = startPlaying;
function pausePlaying() {
    // AudioRecorder.pausePlaying()
    return {
        type: 'PAUSE_PLAYING'
    };
}
exports.pausePlaying = pausePlaying;
function stopPlaying() {
    // AudioRecorder.stopPlaying()
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
