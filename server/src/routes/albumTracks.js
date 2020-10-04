import express from "express";

const router = express.Router();

const AlbumTracks = require("../../models/albumTrack");

router.get("/missing-names", (req, res, next) => {
  AlbumTracks.query()
    .select("album_id")
    .whereNull("name")
    .where("id", "=", "0")
    .where("disc_id", "=", "0")
    .orderBy("album_id")
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = router;
