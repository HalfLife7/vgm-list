import express from 'express';

const router = express.Router();

const Platform = require('../../models/platform');

router.get('/max', (req, res, next) => {
  Platform.query()
    .max('id')
    .then((platformId) => {
      res.send(platformId);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
