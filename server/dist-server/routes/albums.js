"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

var router = _express["default"].Router();

var Album = require("../../models/album");

router.get("/all", function (req, res, next) {
  Album.query().withGraphFetched("albumArtists.[artists(selectName)]").modifiers({
    selectName: function selectName(builder) {
      builder.select("name");
    }
  }).then(function (albums) {
    res.send(albums);
  });
});
router.get("/:id", function (req, res, next) {
  var albumId = req.params.id;
  Album.query().findById(albumId).withGraphFetched("artists.[artists(selectName)]").modifiers({
    selectName: function selectName(builder) {
      builder.select("name");
    }
  }).withGraphFetched("covers").withGraphFetched("discs").withGraphFetched("stores").withGraphFetched("tracks").then(function (album) {
    if (album.stores !== undefined) {
      album.stores.map(function (store) {
        if (store.name === "iTunes") {
          store.name = "Apple Music";
          store.logo = "https://upload.wikimedia.org/wikipedia/commons/d/df/ITunes_logo.svg";
        } else if (store.name === "Google Play") {
          store.logo = "https://www.vectorlogo.zone/logos/google_play/google_play-tile.svg";
        } else if (store.name === "Amazon") {
          store.logo = "https://www.vectorlogo.zone/logos/amazon/amazon-tile.svg";
        } else if (store.name === "Discogs") {
          store.logo = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Discogs.png";
        } else if (store.name === "Bandcamp") {
          store.logo = "https://upload.wikimedia.org/wikipedia/commons/3/36/Bandcamp-button-square-black.svg";
        } else if (store.name === "Spotify") {
          store.logo = "https://www.vectorlogo.zone/logos/spotify/spotify-tile.svg";
        } else {
          store.logo = "https://icongr.am/fontawesome/music.svg?size=148&color=0080c0";
        }
      });
    }

    if (album.release_date !== undefined) {
      album.release_date = _moment["default"].utc(album.release_date).format("YYYY-MM-DD");
    }

    if (album.tracks !== undefined) {
      album.tracks.map(function (track) {
        track.disc_id += 1;
        track.id += 1;
      });
    }

    if (album.discs !== undefined) {
      album.discs.map(function (disc) {
        disc.id += 1;
      });
    }

    res.send(album);
  });
});
router.get("/", function (req, res, next) {});
var _default = router;
exports["default"] = _default;