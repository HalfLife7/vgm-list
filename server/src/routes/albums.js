import express from "express";
import moment from "moment";

const router = express.Router();

const Album = require("../../models/album");

router.get("/not-updated", (req, res, next) => {
  Album.query()
    .min("id")
    .where("updated_at", "IS", null)
    .then((albumId) => {
      res.send(albumId);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/all", (req, res, next) => {
  Album.query()
    .withGraphFetched("albumArtists.[artists(selectName)]")
    .modifiers({
      selectName: (builder) => {
        builder.select("name");
      },
    })
    .then((albums) => {
      res.send(albums);
    });
});

router.get("/:id", (req, res, next) => {
  const albumId = req.params.id;

  Album.query()
    .findById(albumId)
    .withGraphFetched("artists.[artists(selectName)]")
    .modifiers({
      selectName: (builder) => {
        builder.select("name");
      },
    })
    .withGraphFetched("covers")
    .withGraphFetched("discs")
    .withGraphFetched("stores")
    .withGraphFetched("tracks")
    .then((album) => {
      if (album.stores !== undefined) {
        album.stores.map((store) => {
          if (store.name === "iTunes") {
            store.name = "Apple Music";
            store.logo =
              "https://upload.wikimedia.org/wikipedia/commons/d/df/ITunes_logo.svg";
          } else if (store.name === "Google Play") {
            store.logo =
              "https://www.vectorlogo.zone/logos/google_play/google_play-tile.svg";
          } else if (store.name === "Amazon") {
            store.logo =
              "https://www.vectorlogo.zone/logos/amazon/amazon-tile.svg";
          } else if (store.name === "Discogs") {
            store.logo =
              "https://upload.wikimedia.org/wikipedia/commons/8/8c/Discogs.png";
          } else if (store.name === "Bandcamp") {
            store.logo =
              "https://upload.wikimedia.org/wikipedia/commons/3/36/Bandcamp-button-square-black.svg";
          } else if (store.name === "Spotify") {
            store.logo =
              "https://www.vectorlogo.zone/logos/spotify/spotify-tile.svg";
          } else {
            store.logo =
              "https://icongr.am/fontawesome/music.svg?size=148&color=0080c0";
          }
        });
      }

      if (album.release_date !== undefined) {
        album.release_date = moment
          .utc(album.release_date)
          .format("YYYY-MM-DD");
      }

      if (album.covers !== undefined) {
        console.log(album.covers);
        if (album.covers.length === 0) {
          album.covers.push({
            full:
              "https://via.placeholder.com/600x600.png/000000/FFFFFF?text=Missing%20Cover",
          });
        }
      }

      if (album.tracks !== undefined) {
        album.tracks.map((track) => {
          track.disc_id += 1;
          track.id += 1;
        });
      }

      if (album.discs !== undefined) {
        album.discs.map((disc) => {
          disc.id += 1;
        });
      }

      res.send(album);
    });
});

export default router;
