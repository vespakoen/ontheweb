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
var react_redux_1 = require("react-redux");
var helpOthers_1 = require("../redux/helpOthers");
var Waveform_1 = __importDefault(require("./Waveform"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var HelpOthers = /** @class */ (function (_super) {
    __extends(HelpOthers, _super);
    function HelpOthers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelpOthers.prototype.componentDidMount = function () {
        this.props.getCurrentHumm();
    };
    HelpOthers.prototype.render = function () {
        if (!this.props.helpOthers.humm) {
            return react_1.default.createElement("div", null, "Loading...");
        }
        var humm = this.props.helpOthers.humm;
        var recordingId = humm.recordingId, note = humm.note;
        return (react_1.default.createElement("div", { style: { width: '100%', height: '100%' } },
            react_1.default.createElement("h1", { style: { marginLeft: 20, marginTop: 20, fontFamily: 'Arial', color: '#fff' } }, "Help Others!"),
            react_1.default.createElement("div", { style: {
                    margin: 20,
                    backgroundColor: '#2b2e37',
                    borderRadius: 5,
                    padding: 10,
                    boxShadow: '0px 4px 5px rgba(0, 0, 0, .1)'
                } },
                react_1.default.createElement(Waveform_1.default, { url: "http://localhost:8080/humm/" + recordingId + ".mp3", waveColor: "#9499a1", progressColor: "#fff", height: 180 })),
            react_1.default.createElement("p", null, note),
            react_1.default.createElement("a", { href: "#", onClick: this.props.commentOnHumm }, "I know!"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("a", { href: "#", onClick: this.props.getNextHumm }, "No idea..."),
            react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary" }, "Hello World")));
    };
    return HelpOthers;
}(react_1.default.Component));
exports.default = react_redux_1.connect(function (state) { return state; }, helpOthers_1.actions)(HelpOthers);
