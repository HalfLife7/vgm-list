import express from 'express';
// import config from '../config'
// import axios from 'axios';
const router = express.Router();

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

router.get('/max', (req, res, next) => {
  Game.query()
    .max('id')
    .then((gameId) => {
      res.send(gameId);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/all', (req, res, next) => {
  Game.query()
    .withGraphFetched('covers')
    .then((games) => {
      games.map((game) => {
        // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
        const { url } = game.covers[0];
        game.covers[0].url = url.replace('t_thumb', 't_cover_big');

        const truncate = (input) => (input.length > 250 ? `${input.substring(0, 250)}...` : input);

        game.summary = truncate(game.summary);
      });
      res.send(games);
    });
});

router.get('/search', (req, res, next) => {
  const searchParams = req.query.name;
  console.log(searchParams);
  Game.query()
    // use ilike for case insensitive search (postgres feature)
    .where('name', 'ilike', `%${searchParams}%`)
    .withGraphFetched('covers')
    .then((games) => {
      console.log(games);
      games.map((game) => {
        const { url } = game.covers[0];
        game.covers[0].url = url.replace('t_thumb', 't_cover_big');

        const truncate = (input) => (input.length > 250 ? `${input.substring(0, 250)}...` : input);

        game.summary = truncate(game.summary);
      });
      res.send(games);
    });
});

router.get('/:id', (req, res, next) => {
  const gameId = req.params.id;
  console.log(gameId);

  Game.query()
    .findById(gameId)
    .withGraphFetched('alternativeNames(selectName, onlyEnglish)')
    .modifiers({
      selectName: (builder) => {
        builder.select('name');
      },
      onlyEnglish: (builder) => {
        builder.where('comment', 'Other');
      },
    })
    .withGraphFetched('artworks(selectUrl)')
    .modifiers({
      selectUrl: (builder) => {
        builder.select('url');
      },
    })
    .withGraphFetched('covers(selectUrl)')
    .modifiers({
      selectUrl: (builder) => {
        builder.select('url');
      },
    })
    .withGraphFetched('screenshots(selectUrl)')
    .modifiers({
      selectUrl: (builder) => {
        builder.select('url');
      },
    })
    .withGraphFetched('videos(selectVideoIdAndName)')
    .modifiers({
      selectVideoIdAndName: (builder) => {
        builder.select('name', 'video_id');
      },
    })
    .withGraphFetched('websites(selectCategoryAndUrl)')
    .modifiers({
      selectCategoryAndUrl: (builder) => {
        builder.select('category', 'url');
      },
    })
    .withGraphFetched('albums(selectId)')
    .modifiers({
      selectId: (builder) => {
        builder.select('id');
      },
    })
    .then((game) => {
      console.log(game);
      res.send(game);
    });
});

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
