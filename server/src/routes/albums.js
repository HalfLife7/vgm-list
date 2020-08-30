import express from 'express';
var router = express.Router();

const Album = require('../../models/album');

router.get('/all', function (req, res, next) {
    Album.query()
        .withGraphFetched('albumArtists.[artists(selectName)]')
        .modifiers({
            selectName: builder => {
                builder.select('name');
            }
        })
        .then(albums => {
            res.send(albums);
        })
})

router.get('/:id', function (req, res, next) {
    const albumId = req.params.id;

    Album.query()
        .findById(albumId)
        .withGraphFetched('albumArtists.[artists(selectName)]')
        .modifiers({
            selectName: builder => {
                builder.select('name');
            }
        })
        .then(albums => {
            res.send(albums);
        })
})

router.get('/', function (req, res, next) {

})

export default router;