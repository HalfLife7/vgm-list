"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _util = _interopRequireDefault(require("util"));

var _config = _interopRequireDefault(require("./config"));

var router = _express["default"].Router();

var axios = require('axios')["default"];

var _require = require('cron'),
    CronJob = _require.CronJob;

var _require2 = require('objection'),
    raw = _require2.raw;

var Game = require('../models/game');

var GameAlternativeName = require('../models/gameAlternativeName');

var GameArtwork = require('../models/gameArtwork');

var GameCover = require('../models/gameCover');

var GameScreenshot = require('../models/gameScreenshot');

var GameVideo = require('../models/gameVideo');

var GameWebsite = require('../models/gameWebsite');

var GamePlatform = require('../models/gamePlatform');

var Platform = require('../models/platform');

var PlatformLogo = require('../models/platformLogo');

var updateGameDb = new CronJob('*/30 * * * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
  var getMaxGameId, maxGameId, getGames, games;
  return _regenerator["default"].wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          console.log('starting'); // get highest id from db

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
                        method: 'get',
                        url: 'http://localhost:3000/games/max'
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
          } // console.log(util.inspect(maxGameId, false, null, true));
          // remove for now, cannot get header to send api key
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
                        url: 'https://api-v3.igdb.com/games',
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'user-key': _config["default"].IGDB_KEY
                        },
                        data: "fields aggregated_rating_count, aggregated_rating, alternative_names.*, category, first_release_date, name, platforms.*, slug, summary, artworks.*, cover.*, videos.*, screenshots.*, websites.*;  where version_parent = null & id > ".concat(maxGameId, "; limit 500; sort id asc;")
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

          _context10.next = 9;
          return getGames();

        case 9:
          games = _context10.sent;
          _context10.prev = 10;
          _context10.next = 13;
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

        case 13:
          _context10.next = 18;
          break;

        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10["catch"](10);
          console.error(_context10.t0);

        case 18:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10, null, [[10, 15]]);
})));
var updatePlatforms = new CronJob('*/30 * * * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
  var getMaxGameId, maxPlatformId, getPlatforms, platforms;
  return _regenerator["default"].wrap(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          // get highest id from db
          getMaxGameId = /*#__PURE__*/function () {
            var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
              var response;
              return _regenerator["default"].wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.prev = 0;
                      _context11.next = 3;
                      return axios({
                        method: 'get',
                        url: 'http://localhost:3000/platforms/max'
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

            return function getMaxGameId() {
              return _ref12.apply(this, arguments);
            };
          }();

          _context14.next = 3;
          return getMaxGameId();

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
                        url: 'https://api-v3.igdb.com/platforms',
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'user-key': _config["default"].IGDB_KEY
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
}))); // run this cron once to populate platform tables
// updatePlatforms.start();
// run this cron job for about 2 hours to pull all 129000~ game entries from igdb
// updateGameDb.start();

module.exports = router;