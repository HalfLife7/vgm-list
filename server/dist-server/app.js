"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/index"));

var _games = _interopRequireDefault(require("./routes/games"));

var _albums = _interopRequireDefault(require("./routes/albums"));

var _platforms = _interopRequireDefault(require("./routes/platforms"));

var _platformLogos = _interopRequireDefault(require("./routes/platformLogos"));

var _collections = _interopRequireDefault(require("./routes/collections"));

var _cron = _interopRequireDefault(require("./cron"));

// initial setup - https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/
// include @babel/plugin-transform-runtime > fix ReferenceError regeneratorRuntime is not defined > https://github.com/babel/babel/issues/9849
// install cors > fix vue axios request error (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)
// add quotations around 'NODE_ENV=development' to fix undefined error - https://stackoverflow.com/questions/11104028/process-env-node-env-is-undefined
// import history from 'connect-history-api-fallback';
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use((0, _cors["default"])({
  origin: "http://localhost:8080"
}));
app.use("/", _index["default"]);
app.use("/games", _games["default"]);
app.use("/albums", _albums["default"]);
app.use("/platforms", _platforms["default"]);
app.use("/platform-logos", _platformLogos["default"]);
app.use("/collections", _collections["default"]);
app.use(_albums["default"]);
module.exports = app;