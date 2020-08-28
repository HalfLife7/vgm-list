import express from 'express';
var router = express.Router();

const Album = require('../../models/album');

router.get('/all', function (req, res, next) {
    Album.query()
        .withGraphFetched('covers')
        .then(albums => {
            albums.map(album => {
                // album.covers[0] ? album.cover.url.replace("t_thumb", "t_cover_big") : null
                let url = album.covers[0].url;
                album.covers[0].url = url.replace("t_thumb", "t_cover_big");

                const truncate = input =>
                    input.length > 250 ? `${input.substring(0, 250)}...` : input;

                album.summary = truncate(album.summary);
            });
            res.send(albums);
        })
})

router.get('/search/:id', function (req, res, next) {
    const searchParams = req.params.searchParams;
    console.log(searchParams);
    console.log(req.params.searchParams)
    Game.query()
        // use ilike for case insensitive search (postgres feature)
        .where('name', 'ilike', `%${searchParams}%`)
        .withGraphFetched('covers')
        .then(games => {
            console.log(games);
            games.map(game => {
                let url = game.covers[0].url;
                game.covers[0].url = url.replace("t_thumb", "t_cover_big");

                const truncate = input =>
                    input.length > 250 ? `${input.substring(0, 250)}...` : input;

                game.summary = truncate(game.summary);
            });
            res.send(games);
        })
})