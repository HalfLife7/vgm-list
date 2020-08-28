import express from 'express';
// import config from '../config'
// import axios from 'axios';
var router = express.Router();

const Game = require('../../models/game');

// remove for now, cannot get header to send api key
// import igdb from 'igdb-api-node';
// const client = igdb(config.IGDB_KEY);

// router.get('/all', function (req, res, next) {
//   axios({
//       url: "https://api-v3.igdb.com/games",
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'user-key': config.IGDB_KEY
//       },
//       data: 'search "Final Fantasy"; fields name, summary, cover.url;  where version_parent = null; limit 10;'
//     })
//     .then(response => {
//       console.log(response.data);
//       response.data.map(game => {
//         let url = game.cover.url;
//         game.cover.url = url.replace("t_thumb", "t_cover_big");

//         const truncate = input =>
//           input.length > 250 ? `${input.substring(0, 250)}...` : input;

//         game.summary = truncate(game.summary);
//       });
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

router.get('/all', function (req, res, next) {
  Game.query()
    .withGraphFetched('covers')
    .then(games => {
      games.map(game => {
        // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
        let url = game.covers[0].url;
        game.covers[0].url = url.replace("t_thumb", "t_cover_big");

        const truncate = input =>
          input.length > 250 ? `${input.substring(0, 250)}...` : input;

        game.summary = truncate(game.summary);
      });
      res.send(games);
    })
})

router.get('/search/:searchParams', function (req, res, next) {
  const searchParams = req.params.searchParams;
  console.log(searchParams);
  console.log(req.params.searchParams)
  Game.query()
    // use ilike for case insensitive search (postgres feature)
    .where('name', 'ilike', `%${searchParams}%`)
    .eager('covers')
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

// router.get('/search/:searchParams', function (req, res, next) {
//   const searchParams = req.params.searchParams;
//   axios({
//       url: "https://api-v3.igdb.com/games",
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'user-key': config.IGDB_KEY
//       },
//       data: 'search "' + searchParams + '"; fields name, summary, cover.url;  where version_parent = null; limit 10;'
//     })
//     .then(response => {
//       console.log(response.data);
//       response.data.map(game => {
//         let url = game.cover.url;
//         game.cover.url = url.replace("t_thumb", "t_cover_big");

//         const truncate = input =>
//           input.length > 250 ? `${input.substring(0, 250)}...` : input;

//         game.summary = truncate(game.summary);
//       });
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });


export default router;