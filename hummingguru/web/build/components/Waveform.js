"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var wavesurfer_js_1 = __importDefault(require("wavesurfer.js"));
var Waveform = /** @class */ (function (_super) {
    __extends(Waveform, _super);
    function Waveform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Waveform.prototype.componentDidMount = function () {
        this.wave = wavesurfer_js_1.default.create({
            container: this.refs.WAVEFORM,
            waveColor: this.props.waveColor,
            progressColor: this.props.progressColor,
            height: this.props.height,
            normalize: true,
            cursorWidth: 0
        });
        this.wave.load(this.props.url);
    };
    Waveform.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.url !== nextProps.url) {
            this.wave.load(nextProps.url);
        }
    };
    Waveform.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { ref: "waveform", style: { position: 'relative' } },
            react_1.default.createElement("div", { ref: "TOUCH", onClick: function () { return _this.wave.playPause(); }, style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } }),
            react_1.default.createElement("div", { ref: "WAVEFORM" })));
    };
    return Waveform;
}(react_1.default.Component));
exports.default = Waveform;
