import express from 'express';

const router = express.Router();

const Album = require('../../models/album');

router.get('/all', (req, res, next) => {
  Album.query()
    .withGraphFetched('albumArtists.[artists(selectName)]')
    .modifiers({
      selectName: (builder) => {
        builder.select('name');
      },
    })
    .then((albums) => {
      res.send(albums);
    });
});

router.get('/:id', (req, res, next) => {
  const albumId = req.params.id;

  Album.query()
    .findById(albumId)
    .withGraphFetched('albumArtists.[artists(selectName)]')
    .modifiers({
      selectName: (builder) => {
        builder.select('name');
      },
    })
    .then((albums) => {
      res.send(albums);
    });
});

router.get('/', (req, res, next) => {});

export default router;
