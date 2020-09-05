import express from 'express';

const router = express.Router();

const PlatformLogo = require('../../models/platformLogo');

router.get('/max', (req, res, next) => {
  PlatformLogo.query()
    .max('id')
    .then((platformLogoId) => {
      res.send(platformLogoId);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
