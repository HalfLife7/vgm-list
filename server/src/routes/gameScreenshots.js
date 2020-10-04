import express from "express";
const { raw } = require("objection");

const router = express.Router();

const GameScreenshots = require("../../models/gameScreenshot");

router.get("/random", (req, res, next) => {
  GameScreenshots.query()
    .select("url")
    .where("width", ">=", "1280")
    .orderBy(raw("random()"))
    .limit(1)
    .then((screenshot) => {
      screenshot[0].url = screenshot[0].url.replace("t_thumb", "t_1080p");
      res.send(screenshot[0]);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = router;
