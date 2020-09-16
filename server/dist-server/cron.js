"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _util = _interopRequireDefault(require("util"));

var _config = _interopRequireDefault(require("./config"));

var _fs = _interopRequireDefault(require("fs"));

var _moment = _interopRequireDefault(require("moment"));

var router = _express["default"].Router();

var axios = require("axios")["default"];

var _require = require("cron"),
    CronJob = _require.CronJob;

var _require2 = require("objection"),
    raw = _require2.raw;

var Game = require("../models/game");

var GameAlternativeName = require("../models/gameAlternativeName");

var GameArtwork = require("../models/gameArtwork");

var GameCover = require("../models/gameCover");

var GameScreenshot = require("../models/gameScreenshot");

var GameVideo = require("../models/gameVideo");

var GameWebsite = require("../models/gameWebsite");

var GamePlatform = require("../models/gamePlatform");

var GameCollection = require("../models/gameCollection");

var Platform = require("../models/platform");

var PlatformLogo = require("../models/platformLogo");

var Collection = require("../models/collection");

var Album = require("../models/album");

var AlbumCover = require("../models/albumCover");

var AlbumDisc = require("../models/albumDisc");

var AlbumStore = require("../models/albumStore");

var AlbumTrack = require("../models/albumTrack");

var updateGameDb = new CronJob("*/30 * * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
  var getMaxGameId, maxGameId, getGames, games;
  return _regenerator["default"].wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
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

          _context10.next = 4;
          return getMaxGameId();

        case 4:
          maxGameId = _context10.sent;

          if (maxGameId === null) {
            maxGameId = 1;
          }

          console.log(_util["default"].inspect(maxGameId, false, null, true)); // remove for now, cannot get header to send api key
          // import igdb from 'igdb-api-node';
          // const client = igdb(config.IGDB_KEY);

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
                        data: "fields aggregated_rating_count, aggregated_rating, alternative_names.*, category, collection.*, first_release_date, name, platforms.*, slug, summary, artworks.*, cover.*, videos.*, screenshots.*, websites.*;  where version_parent = null & id > ".concat(maxGameId, "; limit 500; sort id asc;")
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

          _context10.next = 10;
          return getGames();

        case 10:
          games = _context10.sent;
          _context10.prev = 11;
          _context10.next = 14;
          return Promise.all(games.data.map( /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(game) {
              var _game$cover, _game$cover2, _game$cover3, _game$cover4, _game$cover5, _game$cover6, _game$cover7, _game$cover8;

              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
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
                        _context9.next = 5;
                        break;
                      }

                      _context9.next = 5;
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
                        _context9.next = 8;
                        break;
                      }

                      _context9.next = 8;
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
                      if (!(game.cover !== undefined)) {
                        _context9.next = 11;
                        break;
                      }

                      _context9.next = 11;
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
                        _context9.next = 14;
                        break;
                      }

                      _context9.next = 14;
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
                        _context9.next = 17;
                        break;
                      }

                      _context9.next = 17;
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
                        _context9.next = 20;
                        break;
                      }

                      _context9.next = 20;
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
                      if (!(game.platforms !== undefined)) {
                        _context9.next = 23;
                        break;
                      }

                      _context9.next = 23;
                      return Promise.all(game.platforms.map( /*#__PURE__*/function () {
                        var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(platform) {
                          return _regenerator["default"].wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return GamePlatform.query().insert({
                                    game_id: game.id,
                                    platform_id: platform.id
                                  });

                                case 2:
                                case "end":
                                  return _context8.stop();
                              }
                            }
                          }, _callee8);
                        }));

                        return function (_x7) {
                          return _ref10.apply(this, arguments);
                        };
                      }()));

                    case 23:
                      if (!(game.collection !== undefined)) {
                        _context9.next = 26;
                        break;
                      }

                      _context9.next = 26;
                      return GameCollection.query().insert({
                        game_id: game.id,
                        collection_id: game.collection.id
                      });

                    case 26:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9);
            }));

            return function (_x) {
              return _ref4.apply(this, arguments);
            };
          }()));

        case 14:
          _context10.next = 19;
          break;

        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](11);
          console.error(_context10.t0);

        case 19:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10, null, [[11, 16]]);
})));
var updatePlatforms = new CronJob("*/30 * * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
  var getMaxPlatformId, maxPlatformId, getPlatforms, platforms;
  return _regenerator["default"].wrap(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          // get highest id from db
          getMaxPlatformId = /*#__PURE__*/function () {
            var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
              var response;
              return _regenerator["default"].wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.prev = 0;
                      _context11.next = 3;
                      return axios({
                        method: "get",
                        url: "http://localhost:3000/platforms/max"
                      });

                    case 3:
                      response = _context11.sent;
                      return _context11.abrupt("return", response.data[0].max);

                    case 7:
                      _context11.prev = 7;
                      _context11.t0 = _context11["catch"](0);
                      console.error(_context11.t0);

                    case 10:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11, null, [[0, 7]]);
            }));

            return function getMaxPlatformId() {
              return _ref12.apply(this, arguments);
            };
          }();

          _context14.next = 3;
          return getMaxPlatformId();

        case 3:
          maxPlatformId = _context14.sent;

          if (maxPlatformId === null) {
            maxPlatformId = 0;
          } // console.log(util.inspect(maxPlatformId, false, null, true));


          getPlatforms = /*#__PURE__*/function () {
            var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
              var response;
              return _regenerator["default"].wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.prev = 0;
                      _context12.next = 3;
                      return axios({
                        url: "https://api-v3.igdb.com/platforms",
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "user-key": _config["default"].IGDB_KEY
                        },
                        data: "fields *, platform_logo.*; where id > ".concat(maxPlatformId, "; limit 500; sort id asc;")
                      });

                    case 3:
                      response = _context12.sent;
                      return _context12.abrupt("return", response);

                    case 7:
                      _context12.prev = 7;
                      _context12.t0 = _context12["catch"](0);
                      console.error(_context12.t0);

                    case 10:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _callee12, null, [[0, 7]]);
            }));

            return function getPlatforms() {
              return _ref13.apply(this, arguments);
            };
          }();

          _context14.next = 8;
          return getPlatforms();

        case 8:
          platforms = _context14.sent;
          _context14.next = 11;
          return Promise.all(platforms.data.map( /*#__PURE__*/function () {
            var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(platform) {
              var _platform$platform_lo, _platform$platform_lo2, _platform$platform_lo3, _platform$platform_lo4, _platform$platform_lo5, _platform$platform_lo6, _platform$platform_lo7, _platform$platform_lo8;

              return _regenerator["default"].wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.prev = 0;
                      _context13.next = 3;
                      return Platform.query().insert({
                        id: platform === null || platform === void 0 ? void 0 : platform.id,
                        abbreviation: platform === null || platform === void 0 ? void 0 : platform.abbreviation,
                        alternative_name: platform === null || platform === void 0 ? void 0 : platform.alternative_name,
                        category: platform === null || platform === void 0 ? void 0 : platform.category,
                        created_at: platform === null || platform === void 0 ? void 0 : platform.created_at,
                        generation: platform === null || platform === void 0 ? void 0 : platform.generation,
                        name: platform === null || platform === void 0 ? void 0 : platform.name,
                        slug: platform === null || platform === void 0 ? void 0 : platform.slug,
                        summary: platform === null || platform === void 0 ? void 0 : platform.summary,
                        updated_at: platform === null || platform === void 0 ? void 0 : platform.updated_at,
                        url: platform === null || platform === void 0 ? void 0 : platform.url,
                        checksum: platform === null || platform === void 0 ? void 0 : platform.checksum
                      });

                    case 3:
                      _context13.next = 8;
                      break;

                    case 5:
                      _context13.prev = 5;
                      _context13.t0 = _context13["catch"](0);
                      console.error(_context13.t0);

                    case 8:
                      if (!(platform.platform_logo !== undefined)) {
                        _context13.next = 17;
                        break;
                      }

                      _context13.prev = 9;
                      _context13.next = 12;
                      return PlatformLogo.query().insert({
                        id: (_platform$platform_lo = platform.platform_logo) === null || _platform$platform_lo === void 0 ? void 0 : _platform$platform_lo.id,
                        platform_id: platform.id,
                        alpha_channel: (_platform$platform_lo2 = platform.platform_logo) === null || _platform$platform_lo2 === void 0 ? void 0 : _platform$platform_lo2.alpha_channel,
                        animated: (_platform$platform_lo3 = platform.platform_logo) === null || _platform$platform_lo3 === void 0 ? void 0 : _platform$platform_lo3.animated,
                        height: (_platform$platform_lo4 = platform.platform_logo) === null || _platform$platform_lo4 === void 0 ? void 0 : _platform$platform_lo4.height,
                        image_id: (_platform$platform_lo5 = platform.platform_logo) === null || _platform$platform_lo5 === void 0 ? void 0 : _platform$platform_lo5.image_id,
                        url: (_platform$platform_lo6 = platform.platform_logo) === null || _platform$platform_lo6 === void 0 ? void 0 : _platform$platform_lo6.url,
                        width: (_platform$platform_lo7 = platform.platform_logo) === null || _platform$platform_lo7 === void 0 ? void 0 : _platform$platform_lo7.width,
                        checksum: (_platform$platform_lo8 = platform.platform_logo) === null || _platform$platform_lo8 === void 0 ? void 0 : _platform$platform_lo8.checksum
                      });

                    case 12:
                      _context13.next = 17;
                      break;

                    case 14:
                      _context13.prev = 14;
                      _context13.t1 = _context13["catch"](9);
                      console.error(_context13.t1);

                    case 17:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13, null, [[0, 5], [9, 14]]);
            }));

            return function (_x8) {
              return _ref14.apply(this, arguments);
            };
          }()));

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, _callee14);
})));
var updateCollections = new CronJob("*/30 * * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
  var getMaxCollectionId, maxCollectionId, getCollections, collections;
  return _regenerator["default"].wrap(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          // get highest id from db
          getMaxCollectionId = /*#__PURE__*/function () {
            var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
              var response;
              return _regenerator["default"].wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.prev = 0;
                      _context15.next = 3;
                      return axios({
                        method: "get",
                        url: "http://localhost:3000/collections/max"
                      });

                    case 3:
                      response = _context15.sent;
                      return _context15.abrupt("return", response.data[0].max);

                    case 7:
                      _context15.prev = 7;
                      _context15.t0 = _context15["catch"](0);
                      console.error(_context15.t0);

                    case 10:
                    case "end":
                      return _context15.stop();
                  }
                }
              }, _callee15, null, [[0, 7]]);
            }));

            return function getMaxCollectionId() {
              return _ref16.apply(this, arguments);
            };
          }();

          _context18.next = 3;
          return getMaxCollectionId();

        case 3:
          maxCollectionId = _context18.sent;

          if (maxCollectionId === null) {
            maxCollectionId = 0;
          }

          console.log(_util["default"].inspect(maxCollectionId, false, null, true));

          getCollections = /*#__PURE__*/function () {
            var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
              var response;
              return _regenerator["default"].wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.prev = 0;
                      _context16.next = 3;
                      return axios({
                        url: "https://api-v3.igdb.com/collections",
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "user-key": _config["default"].IGDB_KEY
                        },
                        data: "fields *; where id > ".concat(maxCollectionId, "; limit 500; sort id asc;")
                      });

                    case 3:
                      response = _context16.sent;
                      return _context16.abrupt("return", response);

                    case 7:
                      _context16.prev = 7;
                      _context16.t0 = _context16["catch"](0);
                      console.error(_context16.t0);

                    case 10:
                    case "end":
                      return _context16.stop();
                  }
                }
              }, _callee16, null, [[0, 7]]);
            }));

            return function getCollections() {
              return _ref17.apply(this, arguments);
            };
          }();

          _context18.next = 9;
          return getCollections();

        case 9:
          collections = _context18.sent;
          _context18.next = 12;
          return Promise.all(collections.data.map( /*#__PURE__*/function () {
            var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(collection) {
              return _regenerator["default"].wrap(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.prev = 0;
                      _context17.next = 3;
                      return Collection.query().insert({
                        id: collection === null || collection === void 0 ? void 0 : collection.id,
                        created_at: collection === null || collection === void 0 ? void 0 : collection.created_at,
                        name: collection === null || collection === void 0 ? void 0 : collection.name,
                        slug: collection === null || collection === void 0 ? void 0 : collection.slug,
                        updated_at: collection === null || collection === void 0 ? void 0 : collection.updated_at,
                        url: collection === null || collection === void 0 ? void 0 : collection.url,
                        checksum: collection === null || collection === void 0 ? void 0 : collection.checksum
                      });

                    case 3:
                      _context17.next = 8;
                      break;

                    case 5:
                      _context17.prev = 5;
                      _context17.t0 = _context17["catch"](0);
                      console.error(_context17.t0);

                    case 8:
                    case "end":
                      return _context17.stop();
                  }
                }
              }, _callee17, null, [[0, 5]]);
            }));

            return function (_x9) {
              return _ref18.apply(this, arguments);
            };
          }()));

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  }, _callee18);
})));
var addAlbums = new CronJob("0 0 * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
  var rawData, albumList;
  return _regenerator["default"].wrap(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          console.log("starting addAlbums");
          rawData = _fs["default"].readFileSync("./data.json");
          albumList = JSON.parse(rawData);
          _context20.next = 5;
          return Promise.all(albumList.albums.map( /*#__PURE__*/function () {
            var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(album) {
              return _regenerator["default"].wrap(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      _context19.prev = 0;
                      _context19.next = 3;
                      return Album.query().insert({
                        id: album.id,
                        name: album.title
                      });

                    case 3:
                      _context19.next = 8;
                      break;

                    case 5:
                      _context19.prev = 5;
                      _context19.t0 = _context19["catch"](0);
                      console.error(_context19.t0);

                    case 8:
                    case "end":
                      return _context19.stop();
                  }
                }
              }, _callee19, null, [[0, 5]]);
            }));

            return function (_x10) {
              return _ref20.apply(this, arguments);
            };
          }()));

        case 5:
        case "end":
          return _context20.stop();
      }
    }
  }, _callee20);
})));
var updateAlbumDb = new CronJob("*/1 * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
  var _album$products, _album$products$, _album$products$$name, _album$publisher, _album$publisher$name, _album$products2, _album$products2$, _album$products2$$nam;

  var getNotUpdatedAlbumId, updateAlbumId, getAlbum, album, gameId, gameName, getGameId, updateAlbumCovers, _updateAlbumCovers, updateAlbumDiscAndTracks, updateAlbumStores;

  return _regenerator["default"].wrap(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          console.log("starting updateAlbumDb"); // get highest id from db

          getNotUpdatedAlbumId = /*#__PURE__*/function () {
            var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
              var response;
              return _regenerator["default"].wrap(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      _context21.prev = 0;
                      _context21.next = 3;
                      return axios({
                        method: "get",
                        url: "http://localhost:3000/albums/not-updated"
                      });

                    case 3:
                      response = _context21.sent;
                      return _context21.abrupt("return", response.data[0].min);

                    case 7:
                      _context21.prev = 7;
                      _context21.t0 = _context21["catch"](0);
                      console.error(_context21.t0);

                    case 10:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, _callee21, null, [[0, 7]]);
            }));

            return function getNotUpdatedAlbumId() {
              return _ref22.apply(this, arguments);
            };
          }();

          _context28.next = 4;
          return getNotUpdatedAlbumId();

        case 4:
          updateAlbumId = _context28.sent;
          console.log(_util["default"].inspect(updateAlbumId, false, null, true));

          getAlbum = /*#__PURE__*/function () {
            var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
              var response;
              return _regenerator["default"].wrap(function _callee22$(_context22) {
                while (1) {
                  switch (_context22.prev = _context22.next) {
                    case 0:
                      _context22.prev = 0;
                      _context22.next = 3;
                      return axios({
                        url: "http://vgmdb.info/album/".concat(updateAlbumId),
                        method: "GET",
                        headers: {
                          Accept: "application/json"
                        }
                      }).then(function (response) {
                        return response.data;
                      });

                    case 3:
                      response = _context22.sent;
                      return _context22.abrupt("return", response);

                    case 7:
                      _context22.prev = 7;
                      _context22.t0 = _context22["catch"](0);
                      console.error(_context22.t0);

                    case 10:
                    case "end":
                      return _context22.stop();
                  }
                }
              }, _callee22, null, [[0, 7]]);
            }));

            return function getAlbum() {
              return _ref23.apply(this, arguments);
            };
          }();

          _context28.next = 9;
          return getAlbum();

        case 9:
          album = _context28.sent;
          // console.log(util.inspect(album, false, null, true));
          gameId = null;
          gameName = album === null || album === void 0 ? void 0 : (_album$products = album.products) === null || _album$products === void 0 ? void 0 : (_album$products$ = _album$products[0]) === null || _album$products$ === void 0 ? void 0 : (_album$products$$name = _album$products$.names) === null || _album$products$$name === void 0 ? void 0 : _album$products$$name.en;
          console.log(gameName);

          if (!(gameName !== undefined)) {
            _context28.next = 18;
            break;
          }

          // get highest id from db
          getGameId = /*#__PURE__*/function () {
            var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
              var response;
              return _regenerator["default"].wrap(function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.prev = 0;
                      _context23.next = 3;
                      return axios({
                        method: "get",
                        url: "http://localhost:3000/games/search-by-exact-name/".concat(gameName)
                      });

                    case 3:
                      response = _context23.sent;
                      return _context23.abrupt("return", response.data[0].id);

                    case 7:
                      _context23.prev = 7;
                      _context23.t0 = _context23["catch"](0);
                      console.error(_context23.t0);

                    case 10:
                    case "end":
                      return _context23.stop();
                  }
                }
              }, _callee23, null, [[0, 7]]);
            }));

            return function getGameId() {
              return _ref24.apply(this, arguments);
            };
          }();

          _context28.next = 17;
          return getGameId();

        case 17:
          gameId = _context28.sent;

        case 18:
          _context28.next = 20;
          return Album.query().findById(updateAlbumId).patch({
            game_id: gameId,
            catalog: album === null || album === void 0 ? void 0 : album.catalog,
            category: album === null || album === void 0 ? void 0 : album.category,
            classification: album === null || album === void 0 ? void 0 : album.classification,
            media_format: album === null || album === void 0 ? void 0 : album.media_format,
            notes: album === null || album === void 0 ? void 0 : album.notes,
            publisher: album === null || album === void 0 ? void 0 : (_album$publisher = album.publisher) === null || _album$publisher === void 0 ? void 0 : (_album$publisher$name = _album$publisher.names) === null || _album$publisher$name === void 0 ? void 0 : _album$publisher$name.en,
            game_name: album === null || album === void 0 ? void 0 : (_album$products2 = album.products) === null || _album$products2 === void 0 ? void 0 : (_album$products2$ = _album$products2[0]) === null || _album$products2$ === void 0 ? void 0 : (_album$products2$$nam = _album$products2$.names) === null || _album$products2$$nam === void 0 ? void 0 : _album$products2$$nam.en,
            release_date: album === null || album === void 0 ? void 0 : album.release_date,
            updated_at: (0, _moment["default"])().unix()
          });

        case 20:
          if (!(album.covers.length !== 0)) {
            _context28.next = 26;
            break;
          }

          _context28.next = 23;
          return Promise.all(album.covers.map( /*#__PURE__*/function () {
            var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(cover) {
              return _regenerator["default"].wrap(function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      _context24.next = 2;
                      return AlbumCover.query().insert({
                        id: cover === null || cover === void 0 ? void 0 : cover.full.split("/").pop().split("-").pop().split(".")[0],
                        album_id: updateAlbumId,
                        full: cover === null || cover === void 0 ? void 0 : cover.full,
                        medium: cover === null || cover === void 0 ? void 0 : cover.medium,
                        name: cover === null || cover === void 0 ? void 0 : cover.name,
                        thumb: cover === null || cover === void 0 ? void 0 : cover.thumb
                      });

                    case 2:
                    case "end":
                      return _context24.stop();
                  }
                }
              }, _callee24);
            }));

            return function (_x11) {
              return _ref25.apply(this, arguments);
            };
          }()));

        case 23:
          updateAlbumCovers = _context28.sent;
          _context28.next = 29;
          break;

        case 26:
          _context28.next = 28;
          return AlbumCover.query().insert({
            id: album === null || album === void 0 ? void 0 : album.picture_full.split("/").pop().split("-").pop().split(".")[0],
            album_id: updateAlbumId,
            full: album === null || album === void 0 ? void 0 : album.picture_full,
            medium: album === null || album === void 0 ? void 0 : album.picture_small,
            name: "Front",
            thumb: album === null || album === void 0 ? void 0 : album.picture_thumb
          });

        case 28:
          _updateAlbumCovers = _context28.sent;

        case 29:
          if (!(album.discs.length !== 0)) {
            _context28.next = 33;
            break;
          }

          _context28.next = 32;
          return Promise.all(album.discs.map( /*#__PURE__*/function () {
            var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(disc, discIndex) {
              return _regenerator["default"].wrap(function _callee26$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      _context26.next = 2;
                      return AlbumDisc.query().insert({
                        id: discIndex,
                        album_id: updateAlbumId,
                        length: disc === null || disc === void 0 ? void 0 : disc.disc_length,
                        name: disc === null || disc === void 0 ? void 0 : disc.name
                      });

                    case 2:
                      disc.tracks.map( /*#__PURE__*/function () {
                        var _ref27 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(track, trackIndex) {
                          var _track$names;

                          return _regenerator["default"].wrap(function _callee25$(_context25) {
                            while (1) {
                              switch (_context25.prev = _context25.next) {
                                case 0:
                                  _context25.next = 2;
                                  return AlbumTrack.query().insert({
                                    id: trackIndex,
                                    album_id: updateAlbumId,
                                    disc_id: discIndex,
                                    length: track === null || track === void 0 ? void 0 : track.track_length,
                                    name: track === null || track === void 0 ? void 0 : (_track$names = track.names) === null || _track$names === void 0 ? void 0 : _track$names.English
                                  });

                                case 2:
                                case "end":
                                  return _context25.stop();
                              }
                            }
                          }, _callee25);
                        }));

                        return function (_x14, _x15) {
                          return _ref27.apply(this, arguments);
                        };
                      }());

                    case 3:
                    case "end":
                      return _context26.stop();
                  }
                }
              }, _callee26);
            }));

            return function (_x12, _x13) {
              return _ref26.apply(this, arguments);
            };
          }()));

        case 32:
          updateAlbumDiscAndTracks = _context28.sent;

        case 33:
          if (!(album.stores.length !== 0)) {
            _context28.next = 37;
            break;
          }

          _context28.next = 36;
          return Promise.all(album.stores.map( /*#__PURE__*/function () {
            var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(store) {
              return _regenerator["default"].wrap(function _callee27$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      if (!store.link.includes("db/collection.php")) {
                        _context27.next = 3;
                        break;
                      }

                      _context27.next = 5;
                      break;

                    case 3:
                      _context27.next = 5;
                      return AlbumStore.query().insert({
                        album_id: updateAlbumId,
                        link: store === null || store === void 0 ? void 0 : store.link,
                        name: store === null || store === void 0 ? void 0 : store.name
                      });

                    case 5:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, _callee27);
            }));

            return function (_x16) {
              return _ref28.apply(this, arguments);
            };
          }()));

        case 36:
          updateAlbumStores = _context28.sent;

        case 37:
        case "end":
          return _context28.stop();
      }
    }
  }, _callee28);
}))); // run this cron once to populate platform tables
// updatePlatforms.start();
// run this cron 13x to populate collections tables
//updateCollections.start();
// run this cron job for about 2 hours to pull all 129000~ game entries from igdb
// updateGameDb.start();
// run this cron job to add all initial album names/ids to database
// addAlbums.start();

updateAlbumDb.start();
module.exports = router;