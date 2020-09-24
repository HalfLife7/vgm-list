"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _util = _interopRequireDefault(require("util"));

var _config = _interopRequireDefault(require("./config"));

var _fs = _interopRequireDefault(require("fs"));

var _moment = _interopRequireDefault(require("moment"));

var _artist = _interopRequireDefault(require("../models/artist"));

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

var AlbumGame = require("../models/albumGame");

var AlbumArranger = require("../models/albumArranger");

var AlbumComposer = require("../models/albumComposer");

var AlbumLyricist = require("../models/albumLyricist");

var AlbumPerformer = require("../models/albumPerformer");

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
                      console.error(_context.t0.message);

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
                      console.error(_context2.t0.message);

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
          console.error(_context10.t0.message);

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
                      console.error(_context11.t0.message);

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
                      console.error(_context12.t0.message);

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
                      console.error(_context13.t0.message);

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
                      console.error(_context13.t1.message);

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
                      console.error(_context15.t0.message);

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
                      console.error(_context16.t0.message);

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
                      console.error(_context17.t0.message);

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
var addAlbums = new CronJob("25 15 * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
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
                      console.error(_context19.t0.message);

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
var updateAlbumDb = new CronJob("*/30 * * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
  var _album$products, _album$publisher, _album$publisher$name, _album$covers, _album$discs, _album$stores, _album$arrangers, _album$composers, _album$lyricists, _album$performers;

  var d, getNotUpdatedAlbumId, updateAlbumId, getAlbum, album, updateAlbumGames, updateAlbumCovers, _updateAlbumCovers, updateAlbumDiscAndTracks, updateAlbumStores, updateAlbumArrangers, updateAlbumComposers, updateAlbumLyricists, updateAlbumPerformers;

  return _regenerator["default"].wrap(function _callee33$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          d = new Date();
          console.log(d.toString() + " - starting updateAlbumDb"); // get highest id from db

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
                      console.error(_context21.t0.message);

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

          _context34.next = 5;
          return getNotUpdatedAlbumId();

        case 5:
          updateAlbumId = _context34.sent;

          // console.log(util.inspect(updateAlbumId, false, null, true));
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
                      console.error(_context22.t0.message);

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

          _context34.next = 9;
          return getAlbum();

        case 9:
          album = _context34.sent;
          // console.log(util.inspect(album, false, null, true));
          console.log("Album Name: " + (album === null || album === void 0 ? void 0 : album.name) + "\t\t| ID: " + updateAlbumId);

          if (!((album === null || album === void 0 ? void 0 : (_album$products = album.products) === null || _album$products === void 0 ? void 0 : _album$products.length) !== 0 && album.products)) {
            _context34.next = 15;
            break;
          }

          _context34.next = 14;
          return Promise.all(album.products.map( /*#__PURE__*/function () {
            var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(product) {
              var _loop, _i, _Object$entries;

              return _regenerator["default"].wrap(function _callee24$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
                        var _Object$entries$_i, key, value, langauge, gameName, getGameId, gameId;

                        return _regenerator["default"].wrap(function _loop$(_context24) {
                          while (1) {
                            switch (_context24.prev = _context24.next) {
                              case 0:
                                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                                console.log("".concat(key, ": ").concat(value));
                                langauge = key;
                                gameName = value; // get highest id from db

                                getGameId = /*#__PURE__*/function () {
                                  var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
                                    var cleanGameName, gameNameEncoded, encodedURI, response;
                                    return _regenerator["default"].wrap(function _callee23$(_context23) {
                                      while (1) {
                                        switch (_context23.prev = _context23.next) {
                                          case 0:
                                            // https://stackoverflow.com/questions/11305797/remove-zero-width-space-characters-from-a-javascript-string
                                            // some names from the database have characters that are invalid in urls such as the zero width space
                                            cleanGameName = gameName.replace(/[\u200B-\u200D\uFEFF]/g, "");
                                            gameNameEncoded = encodeURIComponent(cleanGameName);
                                            encodedURI = "http://localhost:3000/games/search-by-exact-name/".concat(gameNameEncoded);
                                            console.log(encodedURI);
                                            _context23.prev = 4;
                                            _context23.next = 7;
                                            return axios({
                                              method: "get",
                                              url: encodedURI
                                            }).then(function (response) {
                                              return response.data.id;
                                            });

                                          case 7:
                                            response = _context23.sent;
                                            return _context23.abrupt("return", response);

                                          case 11:
                                            _context23.prev = 11;
                                            _context23.t0 = _context23["catch"](4);
                                            console.error(_context23.t0.message);

                                          case 14:
                                          case "end":
                                            return _context23.stop();
                                        }
                                      }
                                    }, _callee23, null, [[4, 11]]);
                                  }));

                                  return function getGameId() {
                                    return _ref25.apply(this, arguments);
                                  };
                                }();

                                _context24.next = 7;
                                return getGameId();

                              case 7:
                                gameId = _context24.sent;

                                if (!(gameId !== undefined)) {
                                  _context24.next = 18;
                                  break;
                                }

                                _context24.prev = 9;
                                _context24.next = 12;
                                return AlbumGame.query().insert({
                                  album_id: updateAlbumId,
                                  game_id: gameId
                                });

                              case 12:
                                console.log("Game Name: " + gameName + "\t\t| ID: " + gameId);
                                _context24.next = 18;
                                break;

                              case 15:
                                _context24.prev = 15;
                                _context24.t0 = _context24["catch"](9);
                                console.error(_context24.t0.message);

                              case 18:
                              case "end":
                                return _context24.stop();
                            }
                          }
                        }, _loop, null, [[9, 15]]);
                      });
                      _i = 0, _Object$entries = Object.entries(product.names);

                    case 2:
                      if (!(_i < _Object$entries.length)) {
                        _context25.next = 7;
                        break;
                      }

                      return _context25.delegateYield(_loop(), "t0", 4);

                    case 4:
                      _i++;
                      _context25.next = 2;
                      break;

                    case 7:
                    case "end":
                      return _context25.stop();
                  }
                }
              }, _callee24);
            }));

            return function (_x11) {
              return _ref24.apply(this, arguments);
            };
          }()));

        case 14:
          updateAlbumGames = _context34.sent;

        case 15:
          _context34.next = 17;
          return Album.query().findById(updateAlbumId).patch({
            catalog: album === null || album === void 0 ? void 0 : album.catalog,
            category: album === null || album === void 0 ? void 0 : album.category,
            classification: album === null || album === void 0 ? void 0 : album.classification,
            media_format: album === null || album === void 0 ? void 0 : album.media_format,
            notes: album === null || album === void 0 ? void 0 : album.notes,
            publisher: album === null || album === void 0 ? void 0 : (_album$publisher = album.publisher) === null || _album$publisher === void 0 ? void 0 : (_album$publisher$name = _album$publisher.names) === null || _album$publisher$name === void 0 ? void 0 : _album$publisher$name.en,
            release_date: album === null || album === void 0 ? void 0 : album.release_date,
            updated_at: (0, _moment["default"])().unix()
          });

        case 17:
          if (!((album === null || album === void 0 ? void 0 : (_album$covers = album.covers) === null || _album$covers === void 0 ? void 0 : _album$covers.length) !== 0 && album.covers)) {
            _context34.next = 23;
            break;
          }

          _context34.next = 20;
          return Promise.all(album.covers.map( /*#__PURE__*/function () {
            var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(cover) {
              return _regenerator["default"].wrap(function _callee25$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      _context26.next = 2;
                      return AlbumCover.query().insert({
                        album_id: updateAlbumId,
                        full: cover === null || cover === void 0 ? void 0 : cover.full,
                        medium: cover === null || cover === void 0 ? void 0 : cover.medium,
                        name: cover === null || cover === void 0 ? void 0 : cover.name,
                        thumb: cover === null || cover === void 0 ? void 0 : cover.thumb
                      });

                    case 2:
                    case "end":
                      return _context26.stop();
                  }
                }
              }, _callee25);
            }));

            return function (_x12) {
              return _ref26.apply(this, arguments);
            };
          }()));

        case 20:
          updateAlbumCovers = _context34.sent;
          _context34.next = 26;
          break;

        case 23:
          _context34.next = 25;
          return AlbumCover.query().insert({
            album_id: updateAlbumId,
            full: album === null || album === void 0 ? void 0 : album.picture_full,
            medium: album === null || album === void 0 ? void 0 : album.picture_small,
            name: "Front",
            thumb: album === null || album === void 0 ? void 0 : album.picture_thumb
          });

        case 25:
          _updateAlbumCovers = _context34.sent;

        case 26:
          if (!((album === null || album === void 0 ? void 0 : (_album$discs = album.discs) === null || _album$discs === void 0 ? void 0 : _album$discs.length) !== 0 && album.discs)) {
            _context34.next = 30;
            break;
          }

          _context34.next = 29;
          return Promise.all(album.discs.map( /*#__PURE__*/function () {
            var _ref27 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(disc, discIndex) {
              return _regenerator["default"].wrap(function _callee27$(_context28) {
                while (1) {
                  switch (_context28.prev = _context28.next) {
                    case 0:
                      _context28.next = 2;
                      return AlbumDisc.query().insert({
                        id: discIndex,
                        album_id: updateAlbumId,
                        length: disc === null || disc === void 0 ? void 0 : disc.disc_length,
                        name: disc === null || disc === void 0 ? void 0 : disc.name
                      });

                    case 2:
                      disc.tracks.map( /*#__PURE__*/function () {
                        var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(track, trackIndex) {
                          var _track$names, _track$names3, _track$names5, _track$names7, _track$names9;

                          var trackName, _track$names2, _track$names4, _track$names6, _track$names8, _track$names10, _track$names11;

                          return _regenerator["default"].wrap(function _callee26$(_context27) {
                            while (1) {
                              switch (_context27.prev = _context27.next) {
                                case 0:
                                  if ((track === null || track === void 0 ? void 0 : (_track$names = track.names) === null || _track$names === void 0 ? void 0 : _track$names.English) !== undefined) {
                                    trackName = track === null || track === void 0 ? void 0 : (_track$names2 = track.names) === null || _track$names2 === void 0 ? void 0 : _track$names2.English;
                                  } else if ((track === null || track === void 0 ? void 0 : (_track$names3 = track.names) === null || _track$names3 === void 0 ? void 0 : _track$names3["English (Alternate)"]) !== undefined) {
                                    trackName = track === null || track === void 0 ? void 0 : (_track$names4 = track.names) === null || _track$names4 === void 0 ? void 0 : _track$names4["English (Alternate)"];
                                  } else if ((track === null || track === void 0 ? void 0 : (_track$names5 = track.names) === null || _track$names5 === void 0 ? void 0 : _track$names5["English (Localized)"]) !== undefined) {
                                    trackName = track === null || track === void 0 ? void 0 : (_track$names6 = track.names) === null || _track$names6 === void 0 ? void 0 : _track$names6["English (Localized)"];
                                  } else if ((track === null || track === void 0 ? void 0 : (_track$names7 = track.names) === null || _track$names7 === void 0 ? void 0 : _track$names7["English (Booklet)"]) !== undefined) {
                                    trackName = track === null || track === void 0 ? void 0 : (_track$names8 = track.names) === null || _track$names8 === void 0 ? void 0 : _track$names8["English (Booklet)"];
                                  } else if ((track === null || track === void 0 ? void 0 : (_track$names9 = track.names) === null || _track$names9 === void 0 ? void 0 : _track$names9["English (Literal)"]) !== undefined) {
                                    trackName = track === null || track === void 0 ? void 0 : (_track$names10 = track.names) === null || _track$names10 === void 0 ? void 0 : _track$names10["English (Literal)"];
                                  } else {
                                    trackName = track === null || track === void 0 ? void 0 : (_track$names11 = track.names) === null || _track$names11 === void 0 ? void 0 : _track$names11[0];
                                  }

                                  _context27.next = 3;
                                  return AlbumTrack.query().insert({
                                    id: trackIndex,
                                    album_id: updateAlbumId,
                                    disc_id: discIndex,
                                    length: track === null || track === void 0 ? void 0 : track.track_length,
                                    name: trackName
                                  });

                                case 3:
                                case "end":
                                  return _context27.stop();
                              }
                            }
                          }, _callee26);
                        }));

                        return function (_x15, _x16) {
                          return _ref28.apply(this, arguments);
                        };
                      }());

                    case 3:
                    case "end":
                      return _context28.stop();
                  }
                }
              }, _callee27);
            }));

            return function (_x13, _x14) {
              return _ref27.apply(this, arguments);
            };
          }()));

        case 29:
          updateAlbumDiscAndTracks = _context34.sent;

        case 30:
          if (!((album === null || album === void 0 ? void 0 : (_album$stores = album.stores) === null || _album$stores === void 0 ? void 0 : _album$stores.length) !== 0 && album.stores)) {
            _context34.next = 34;
            break;
          }

          _context34.next = 33;
          return Promise.all(album.stores.map( /*#__PURE__*/function () {
            var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(store) {
              return _regenerator["default"].wrap(function _callee28$(_context29) {
                while (1) {
                  switch (_context29.prev = _context29.next) {
                    case 0:
                      if (!store.link.includes("db/collection.php")) {
                        _context29.next = 3;
                        break;
                      }

                      _context29.next = 5;
                      break;

                    case 3:
                      _context29.next = 5;
                      return AlbumStore.query().insert({
                        album_id: updateAlbumId,
                        link: store === null || store === void 0 ? void 0 : store.link,
                        name: store === null || store === void 0 ? void 0 : store.name
                      });

                    case 5:
                    case "end":
                      return _context29.stop();
                  }
                }
              }, _callee28);
            }));

            return function (_x17) {
              return _ref29.apply(this, arguments);
            };
          }()));

        case 33:
          updateAlbumStores = _context34.sent;

        case 34:
          if (!((album === null || album === void 0 ? void 0 : (_album$arrangers = album.arrangers) === null || _album$arrangers === void 0 ? void 0 : _album$arrangers.length) !== 0 && album.arrangers)) {
            _context34.next = 38;
            break;
          }

          _context34.next = 37;
          return Promise.all(album.arrangers.map( /*#__PURE__*/function () {
            var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(arranger) {
              var artistId, checkArtist, _arranger$names;

              return _regenerator["default"].wrap(function _callee29$(_context30) {
                while (1) {
                  switch (_context30.prev = _context30.next) {
                    case 0:
                      if (!((arranger === null || arranger === void 0 ? void 0 : arranger.link) !== undefined)) {
                        _context30.next = 26;
                        break;
                      }

                      artistId = arranger.link.split("/")[1];
                      _context30.next = 4;
                      return _artist["default"].query().findById(artistId);

                    case 4:
                      checkArtist = _context30.sent;

                      if (!(checkArtist === undefined)) {
                        _context30.next = 18;
                        break;
                      }

                      _context30.prev = 6;
                      _context30.next = 9;
                      return _artist["default"].query().insert({
                        id: artistId,
                        name: arranger === null || arranger === void 0 ? void 0 : (_arranger$names = arranger.names) === null || _arranger$names === void 0 ? void 0 : _arranger$names.en
                      });

                    case 9:
                      _context30.next = 11;
                      return AlbumArranger.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 11:
                      _context30.next = 16;
                      break;

                    case 13:
                      _context30.prev = 13;
                      _context30.t0 = _context30["catch"](6);
                      console.error(_context30.t0.message);

                    case 16:
                      _context30.next = 26;
                      break;

                    case 18:
                      _context30.prev = 18;
                      _context30.next = 21;
                      return AlbumArranger.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 21:
                      _context30.next = 26;
                      break;

                    case 23:
                      _context30.prev = 23;
                      _context30.t1 = _context30["catch"](18);
                      console.error(_context30.t1.message);

                    case 26:
                    case "end":
                      return _context30.stop();
                  }
                }
              }, _callee29, null, [[6, 13], [18, 23]]);
            }));

            return function (_x18) {
              return _ref30.apply(this, arguments);
            };
          }()));

        case 37:
          updateAlbumArrangers = _context34.sent;

        case 38:
          if (!((album === null || album === void 0 ? void 0 : (_album$composers = album.composers) === null || _album$composers === void 0 ? void 0 : _album$composers.length) !== 0 && album.composers)) {
            _context34.next = 42;
            break;
          }

          _context34.next = 41;
          return Promise.all(album.composers.map( /*#__PURE__*/function () {
            var _ref31 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(composer) {
              var artistId, checkArtist, _composer$names;

              return _regenerator["default"].wrap(function _callee30$(_context31) {
                while (1) {
                  switch (_context31.prev = _context31.next) {
                    case 0:
                      if (!((composer === null || composer === void 0 ? void 0 : composer.link) !== undefined)) {
                        _context31.next = 26;
                        break;
                      }

                      artistId = composer.link.split("/")[1];
                      _context31.next = 4;
                      return _artist["default"].query().findById(artistId);

                    case 4:
                      checkArtist = _context31.sent;

                      if (!(checkArtist === undefined)) {
                        _context31.next = 18;
                        break;
                      }

                      _context31.prev = 6;
                      _context31.next = 9;
                      return _artist["default"].query().insert({
                        id: artistId,
                        name: composer === null || composer === void 0 ? void 0 : (_composer$names = composer.names) === null || _composer$names === void 0 ? void 0 : _composer$names.en
                      });

                    case 9:
                      _context31.next = 11;
                      return AlbumComposer.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 11:
                      _context31.next = 16;
                      break;

                    case 13:
                      _context31.prev = 13;
                      _context31.t0 = _context31["catch"](6);
                      console.error(_context31.t0.message);

                    case 16:
                      _context31.next = 26;
                      break;

                    case 18:
                      _context31.prev = 18;
                      _context31.next = 21;
                      return AlbumComposer.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 21:
                      _context31.next = 26;
                      break;

                    case 23:
                      _context31.prev = 23;
                      _context31.t1 = _context31["catch"](18);
                      console.error(_context31.t1.message);

                    case 26:
                    case "end":
                      return _context31.stop();
                  }
                }
              }, _callee30, null, [[6, 13], [18, 23]]);
            }));

            return function (_x19) {
              return _ref31.apply(this, arguments);
            };
          }()));

        case 41:
          updateAlbumComposers = _context34.sent;

        case 42:
          if (!((album === null || album === void 0 ? void 0 : (_album$lyricists = album.lyricists) === null || _album$lyricists === void 0 ? void 0 : _album$lyricists.length) !== 0 && album.lyricists)) {
            _context34.next = 46;
            break;
          }

          _context34.next = 45;
          return Promise.all(album.lyricists.map( /*#__PURE__*/function () {
            var _ref32 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(lyricist) {
              var artistId, checkArtist, _lyricist$names;

              return _regenerator["default"].wrap(function _callee31$(_context32) {
                while (1) {
                  switch (_context32.prev = _context32.next) {
                    case 0:
                      if (!((lyricist === null || lyricist === void 0 ? void 0 : lyricist.link) !== undefined)) {
                        _context32.next = 26;
                        break;
                      }

                      artistId = lyricist.link.split("/")[1];
                      _context32.next = 4;
                      return _artist["default"].query().findById(artistId);

                    case 4:
                      checkArtist = _context32.sent;

                      if (!(checkArtist === undefined)) {
                        _context32.next = 18;
                        break;
                      }

                      _context32.prev = 6;
                      _context32.next = 9;
                      return _artist["default"].query().insert({
                        id: artistId,
                        name: lyricist === null || lyricist === void 0 ? void 0 : (_lyricist$names = lyricist.names) === null || _lyricist$names === void 0 ? void 0 : _lyricist$names.en
                      });

                    case 9:
                      _context32.next = 11;
                      return AlbumLyricist.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 11:
                      _context32.next = 16;
                      break;

                    case 13:
                      _context32.prev = 13;
                      _context32.t0 = _context32["catch"](6);
                      console.error(_context32.t0.message);

                    case 16:
                      _context32.next = 26;
                      break;

                    case 18:
                      _context32.prev = 18;
                      _context32.next = 21;
                      return AlbumLyricist.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 21:
                      _context32.next = 26;
                      break;

                    case 23:
                      _context32.prev = 23;
                      _context32.t1 = _context32["catch"](18);
                      console.error(_context32.t1.message);

                    case 26:
                    case "end":
                      return _context32.stop();
                  }
                }
              }, _callee31, null, [[6, 13], [18, 23]]);
            }));

            return function (_x20) {
              return _ref32.apply(this, arguments);
            };
          }()));

        case 45:
          updateAlbumLyricists = _context34.sent;

        case 46:
          if (!((album === null || album === void 0 ? void 0 : (_album$performers = album.performers) === null || _album$performers === void 0 ? void 0 : _album$performers.length) !== 0 && album.performers)) {
            _context34.next = 50;
            break;
          }

          _context34.next = 49;
          return Promise.all(album.performers.map( /*#__PURE__*/function () {
            var _ref33 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(performer) {
              var artistId, checkArtist, _performer$names;

              return _regenerator["default"].wrap(function _callee32$(_context33) {
                while (1) {
                  switch (_context33.prev = _context33.next) {
                    case 0:
                      if (!((performer === null || performer === void 0 ? void 0 : performer.link) !== undefined)) {
                        _context33.next = 26;
                        break;
                      }

                      artistId = performer.link.split("/")[1];
                      _context33.next = 4;
                      return _artist["default"].query().findById(artistId);

                    case 4:
                      checkArtist = _context33.sent;

                      if (!(checkArtist === undefined)) {
                        _context33.next = 18;
                        break;
                      }

                      _context33.prev = 6;
                      _context33.next = 9;
                      return _artist["default"].query().insert({
                        id: artistId,
                        name: performer === null || performer === void 0 ? void 0 : (_performer$names = performer.names) === null || _performer$names === void 0 ? void 0 : _performer$names.en
                      });

                    case 9:
                      _context33.next = 11;
                      return AlbumPerformer.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 11:
                      _context33.next = 16;
                      break;

                    case 13:
                      _context33.prev = 13;
                      _context33.t0 = _context33["catch"](6);
                      console.error(_context33.t0.message);

                    case 16:
                      _context33.next = 26;
                      break;

                    case 18:
                      _context33.prev = 18;
                      _context33.next = 21;
                      return AlbumPerformer.query().insert({
                        artist_id: artistId,
                        album_id: updateAlbumId
                      });

                    case 21:
                      _context33.next = 26;
                      break;

                    case 23:
                      _context33.prev = 23;
                      _context33.t1 = _context33["catch"](18);
                      console.error(_context33.t1.message);

                    case 26:
                    case "end":
                      return _context33.stop();
                  }
                }
              }, _callee32, null, [[6, 13], [18, 23]]);
            }));

            return function (_x21) {
              return _ref33.apply(this, arguments);
            };
          }()));

        case 49:
          updateAlbumPerformers = _context34.sent;

        case 50:
        case "end":
          return _context34.stop();
      }
    }
  }, _callee33);
}))); // run this cron once to populate platform tables
// updatePlatforms.start();
// run this cron 13x to populate collections tables
// updateCollections.start();
// run this cron job for about 2 hours to pull all 139000~ game entries from igdb
// updateGameDb.start();
// run this cron job to add all initial album names/ids to database
// addAlbums.start();
// run 15500~ cycles to get all albums for game OST

updateAlbumDb.start();
module.exports = router;