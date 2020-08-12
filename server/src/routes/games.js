import express from 'express';
import config from '../config'
import axios from 'axios';
var router = express.Router();

// remove for now, cannot get header to send api key
// import igdb from 'igdb-api-node';
// const client = igdb(config.IGDB_KEY);

/* GET home page. */
router.get('/all', function (req, res, next) {
  axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': config.IGDB_KEY
      },
      data: 'fields name, cover; search "Final Fantasy"; where version_parent = null; limit 10;'
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/cover', function (req, res, next) {
  axios({
      url: "https://api-v3.igdb.com/covers",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': config.IGDB_KEY
      },
      data: "fields alpha_channel,animated,checksum,game,height,image_id,url,width; where id = 89386;"
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
    });
})

export default router;