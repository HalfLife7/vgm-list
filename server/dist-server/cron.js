"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bottleneck = _interopRequireDefault(require("bottleneck"));

var _util = _interopRequireDefault(require("util"));

var _config = _interopRequireDefault(require("./config"));

var router = _express["default"].Router();

var axios = require("axios")["default"];

var _require = require("cron"),
    CronJob = _require.CronJob;

var Game = require("../models/game");

var GameAlternativeName = require("../models/gameAlternativeName");

var GameArtwork = require("../models/gameArtwork");

var GameCover = require("../models/gameCover");

var GameScreenshot = require("../models/gameScreenshot");

var GameVideo = require("../models/gameVideo");

var GameWebsite = require("../models/gameWebsite");

var updateGameDb = new CronJob("*/30 * * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
  var getMaxGameId, maxGameId, getGames, games;
  return _regenerator["default"].wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          console.log("starting"); // get highest id from db

          getMaxGameId = /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var response;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return axios({
                        method: "get",
                        url: "http://localhost:3000/games/max"
                      });

                    case 3:
                      response = _context.sent;
                      return _context.abrupt("return", response.data[0].max);

                    case 7:
                      _context.prev = 7;
                      _context.t0 = _context["catch"](0);
                      console.error(_context.t0);

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, null, [[0, 7]]);
            }));

            return function getMaxGameId() {
              return _ref2.apply(this, arguments);
            };
          }();

          _context9.next = 4;
          return getMaxGameId();

        case 4:
          maxGameId = _context9.sent;

          if (maxGameId === null) {
            maxGameId = 1;
          } //console.log(util.inspect(maxGameId, false, null, true));


          getGames = /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
              var response;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      _context2.next = 3;
                      return axios({
                        url: "https://api-v3.igdb.com/games",
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "user-key": _config["default"].IGDB_KEY
                        },
                        data: "fields aggregated_rating_count, aggregated_rating, alternative_names.*, category, first_release_date, name, slug, summary, artworks.*, cover.*, videos.*, screenshots.*, websites.*;  where version_parent = null & id > " + maxGameId + "; limit 500; sort id asc;"
                      });

                    case 3:
                      response = _context2.sent;
                      return _context2.abrupt("return", response);

                    case 7:
                      _context2.prev = 7;
                      _context2.t0 = _context2["catch"](0);
                      console.error(_context2.t0);

                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, null, [[0, 7]]);
            }));

            return function getGames() {
              return _ref3.apply(this, arguments);
            };
          }();

          _context9.next = 9;
          return getGames();

        case 9:
          games = _context9.sent;
          _context9.prev = 10;
          _context9.next = 13;
          return Promise.all(games.data.map( /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(game) {
              var _game$cover, _game$cover2, _game$cover3, _game$cover4, _game$cover5, _game$cover6, _game$cover7, _game$cover8;

              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return Game.query().insert({
                        id: game === null || game === void 0 ? void 0 : game.id,
                        aggregated_rating: game === null || game === void 0 ? void 0 : game.aggregated_rating,
                        aggregated_rating_count: game === null || game === void 0 ? void 0 : game.aggregated_rating_count,
                        category: game === null || game === void 0 ? void 0 : game.category,
                        first_release_date: game === null || game === void 0 ? void 0 : game.first_release_date,
                        name: game === null || game === void 0 ? void 0 : game.name,
                        slug: game === null || game === void 0 ? void 0 : game.slug,
                        summary: game === null || game === void 0 ? void 0 : game.summary
                      });

                    case 2:
                      if (!(game.alternative_names !== undefined)) {
                        _context8.next = 5;
                        break;
                      }

                      _context8.next = 5;
                      return Promise.all(game.alternative_names.map( /*#__PURE__*/function () {
                        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(alternative_name) {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return GameAlternativeName.query().insert({
                                    id: alternative_name === null || alternative_name === void 0 ? void 0 : alternative_name.id,
                                    comment: alternative_name === null || alternative_name === void 0 ? void 0 : alternative_name.comment,
                                    game_id: game.id,
                                    name: alternative_name === null || alternative_name === void 0 ? void 0 : alternative_name.name,
                                    checksum: alternative_name === null || alternative_name === void 0 ? void 0 : alternative_name.checksum
                                  });

                                case 2:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        }));

                        return function (_x2) {
                          return _ref5.apply(this, arguments);
                        };
                      }()));

                    case 5:
                      if (!(game.artworks !== undefined)) {
                        _context8.next = 8;
                        break;
                      }

                      _context8.next = 8;
                      return Promise.all(game.artworks.map( /*#__PURE__*/function () {
                        var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(artwork) {
                          return _regenerator["default"].wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return GameArtwork.query().insert({
                                    id: artwork === null || artwork === void 0 ? void 0 : artwork.id,
                                    game_id: game.id,
                                    height: artwork === null || artwork === void 0 ? void 0 : artwork.height,
                                    image_id: artwork === null || artwork === void 0 ? void 0 : artwork.image_id,
                                    url: artwork === null || artwork === void 0 ? void 0 : artwork.url,
                                    width: artwork === null || artwork === void 0 ? void 0 : artwork.width,
                                    checksum: artwork === null || artwork === void 0 ? void 0 : artwork.checksum
                                  });

                                case 2:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          }, _callee4);
                        }));

                        return function (_x3) {
                          return _ref6.apply(this, arguments);
                        };
                      }()));

                    case 8:
                      if (!(game.cover !== void 0)) {
                        _context8.next = 11;
                        break;
                      }

                      _context8.next = 11;
                      return GameCover.query().insert({
                        id: (_game$cover = game.cover) === null || _game$cover === void 0 ? void 0 : _game$cover.id,
                        game_id: game.id,
                        alpha_channel: (_game$cover2 = game.cover) === null || _game$cover2 === void 0 ? void 0 : _game$cover2.alpha_channel,
                        animated: (_game$cover3 = game.cover) === null || _game$cover3 === void 0 ? void 0 : _game$cover3.animated,
                        height: (_game$cover4 = game.cover) === null || _game$cover4 === void 0 ? void 0 : _game$cover4.height,
                        image_id: (_game$cover5 = game.cover) === null || _game$cover5 === void 0 ? void 0 : _game$cover5.image_id,
                        url: (_game$cover6 = game.cover) === null || _game$cover6 === void 0 ? void 0 : _game$cover6.url,
                        width: (_game$cover7 = game.cover) === null || _game$cover7 === void 0 ? void 0 : _game$cover7.width,
                        checksum: (_game$cover8 = game.cover) === null || _game$cover8 === void 0 ? void 0 : _game$cover8.checksum
                      });

                    case 11:
                      if (!(game.screenshots !== undefined)) {
                        _context8.next = 14;
                        break;
                      }

                      _context8.next = 14;
                      return Promise.all(game.screenshots.map( /*#__PURE__*/function () {
                        var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(screenshot) {
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return GameScreenshot.query().insert({
                                    id: screenshot === null || screenshot === void 0 ? void 0 : screenshot.id,
                                    alpha_channel: screenshot === null || screenshot === void 0 ? void 0 : screenshot.alpha_channel,
                                    game_id: game.id,
                                    animated: screenshot === null || screenshot === void 0 ? void 0 : screenshot.animated,
                                    height: screenshot === null || screenshot === void 0 ? void 0 : screenshot.height,
                                    image_id: screenshot === null || screenshot === void 0 ? void 0 : screenshot.image_id,
                                    url: screenshot === null || screenshot === void 0 ? void 0 : screenshot.url,
                                    width: screenshot === null || screenshot === void 0 ? void 0 : screenshot.width,
                                    checksum: screenshot === null || screenshot === void 0 ? void 0 : screenshot.checksum
                                  });

                                case 2:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        }));

                        return function (_x4) {
                          return _ref7.apply(this, arguments);
                        };
                      }()));

                    case 14:
                      if (!(game.videos !== undefined)) {
                        _context8.next = 17;
                        break;
                      }

                      _context8.next = 17;
                      return Promise.all(game.videos.map( /*#__PURE__*/function () {
                        var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(video) {
                          return _regenerator["default"].wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return GameVideo.query().insert({
                                    id: video === null || video === void 0 ? void 0 : video.id,
                                    game_id: game.id,
                                    name: video === null || video === void 0 ? void 0 : video.name,
                                    video_id: video === null || video === void 0 ? void 0 : video.video_id,
                                    checksum: video === null || video === void 0 ? void 0 : video.checksum
                                  });

                                case 2:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6);
                        }));

                        return function (_x5) {
                          return _ref8.apply(this, arguments);
                        };
                      }()));

                    case 17:
                      if (!(game.websites !== undefined)) {
                        _context8.next = 20;
                        break;
                      }

                      _context8.next = 20;
                      return Promise.all(game.websites.map( /*#__PURE__*/function () {
                        var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(website) {
                          return _regenerator["default"].wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return GameWebsite.query().insert({
                                    id: website === null || website === void 0 ? void 0 : website.id,
                                    game_id: game.id,
                                    category: website === null || website === void 0 ? void 0 : website.category,
                                    trusted: website === null || website === void 0 ? void 0 : website.trusted,
                                    url: website === null || website === void 0 ? void 0 : website.url,
                                    checksum: website === null || website === void 0 ? void 0 : website.checksum
                                  });

                                case 2:
                                case "end":
                                  return _context7.stop();
                              }
                            }
                          }, _callee7);
                        }));

                        return function (_x6) {
                          return _ref9.apply(this, arguments);
                        };
                      }()));

                    case 20:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            }));

            return function (_x) {
              return _ref4.apply(this, arguments);
            };
          }()));

        case 13:
          _context9.next = 18;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](10);
          console.error(_context9.t0);

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9, null, [[10, 15]]);
})));
updateGameDb.start(); // var test = new CronJob('*/3 * * * * *', function () {
//     console.log('You will see this message every 3 second');
// }, null, true, 'America/Los_Angeles');
// test.start();

module.exports = router;