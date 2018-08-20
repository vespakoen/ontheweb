"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var router_1 = require("../redux/router");
var Login_1 = __importDefault(require("./Login"));
var HelpOthers_1 = __importDefault(require("./HelpOthers"));
var styles_1 = require("@material-ui/core/styles");
var SwipeableDrawer_1 = __importDefault(require("@material-ui/core/SwipeableDrawer"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var Hearing_1 = __importDefault(require("@material-ui/icons/Hearing"));
var Mic_1 = __importDefault(require("@material-ui/icons/Mic"));
var RecordVoiceOver_1 = __importDefault(require("@material-ui/icons/RecordVoiceOver"));
var Face_1 = __importDefault(require("@material-ui/icons/Face"));
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var theme = styles_1.createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});
var routes = {
    helpOthers: HelpOthers_1.default
};
var App = function (props) {
    var Page = routes[props.router.stack[0]];
    if (!props.login.isLoggedIn) {
        return react_1.default.createElement(Login_1.default, null);
    }
    return react_1.default.createElement("div", { style: { position: 'absolute', height: '100%', width: '100%', backgroundColor: '#252830' } },
        react_1.default.createElement(styles_1.MuiThemeProvider, { theme: theme },
            react_1.default.createElement(SwipeableDrawer_1.default, { open: false },
                react_1.default.createElement(List_1.default, { component: "nav" },
                    react_1.default.createElement(ListItem_1.default, { button: true },
                        react_1.default.createElement(ListItemIcon_1.default, null,
                            react_1.default.createElement(Hearing_1.default, null)),
                        react_1.default.createElement(ListItemText_1.default, { primary: "Help Others" })),
                    react_1.default.createElement(ListItem_1.default, { button: true },
                        react_1.default.createElement(ListItemIcon_1.default, null,
                            react_1.default.createElement(Mic_1.default, null)),
                        react_1.default.createElement(ListItemText_1.default, { primary: "Get Help" })),
                    react_1.default.createElement(ListItem_1.default, { button: true },
                        react_1.default.createElement(ListItemIcon_1.default, null,
                            react_1.default.createElement(RecordVoiceOver_1.default, null)),
                        react_1.default.createElement(ListItemText_1.default, { primary: "Humms" })),
                    react_1.default.createElement(ListItem_1.default, { button: true },
                        react_1.default.createElement(ListItemIcon_1.default, null,
                            react_1.default.createElement(Face_1.default, null)),
                        react_1.default.createElement(ListItemText_1.default, { primary: "Profile" })))),
            react_1.default.createElement(AppBar_1.default, { position: "static" },
                react_1.default.createElement(Toolbar_1.default, null,
                    react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "Menu" },
                        react_1.default.createElement(Menu_1.default, null)),
                    react_1.default.createElement(Typography_1.default, { variant: "title", color: "inherit" }, "Get Help"))),
            react_1.default.createElement(Page, null)));
};
exports.default = react_redux_1.connect(function (state) { return state; }, router_1.actions)(App);
