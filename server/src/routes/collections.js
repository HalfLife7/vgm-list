import express from "express";

const router = express.Router();

const Collection = require("../../models/collection");

router.get("/max", (req, res, next) => {
  Collection.query()
    .max("id")
    .then((collectionId) => {
      res.send(collectionId);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = router;
