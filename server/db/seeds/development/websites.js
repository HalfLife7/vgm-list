exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('websites').del()
    .then(function () {
      // Inserts seed entries
      return knex('websites').insert([{
          "id": 17385,
          "category": 13,
          "game_id": 11800,
          "trusted": true,
          "url": "https://store.steampowered.com/app/435150",
          "checksum": "9486632b-36be-7629-9f93-5826998ac10a"
        },
        {
          "id": 57598,
          "category": 3,
          "game_id": 11800,
          "trusted": true,
          "url": "https://en.wikipedia.org/wiki/Divinity:_Original_Sin_II",
          "checksum": "dfb5651b-4e84-67bc-5f4f-434d32339a42"
        },
        {
          "id": 66111,
          "category": 1,
          "game_id": 11800,
          "trusted": false,
          "url": "http://divinity.game",
          "checksum": "c8798630-8f88-7206-f02e-8c341e49d067"
        },
        {
          "id": 119236,
          "category": 17,
          "game_id": 11800,
          "trusted": true,
          "url": "https://www.gog.com/game/divinity_original_sin_2",
          "checksum": "680d32cf-78cf-ed38-8114-cd7aa6031d44"
        },
        {
          id: 2,
          colName: 'rowValue2'
        },
        {
          id: 3,
          colName: 'rowValue3'
        }
      ]);
    });
};