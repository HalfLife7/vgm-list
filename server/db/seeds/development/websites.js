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
          "id": 14980,
          "category": 1,
          "game_id": 386,
          "trusted": false,
          "url": "http://www.finalfantasyxiv.com/",
          "checksum": "aa516f64-ce40-020a-c4d9-ad2c3d079569"
        },
        {
          "id": 14981,
          "category": 13,
          "game_id": 386,
          "trusted": true,
          "url": "https://store.steampowered.com/app/39210",
          "checksum": "58f52dad-ed69-a705-7211-b13e10cd5abf"
        },
        {
          "id": 108108,
          "category": 14,
          "game_id": 386,
          "trusted": true,
          "url": "https://www.reddit.com/r/ffxiv",
          "checksum": "946e2a42-82d2-92e9-0a98-224f763f92aa"
        },
        {
          "id": 112079,
          "category": 3,
          "game_id": 386,
          "trusted": true,
          "url": "https://en.wikipedia.org/wiki/Final_Fantasy_XIV",
          "checksum": "387975ad-8e44-174f-4bf3-c3047d0b61d4"
        },
        {
          "id": 112080,
          "category": 4,
          "game_id": 386,
          "trusted": true,
          "url": "https://www.facebook.com/FinalFantasyXIV",
          "checksum": "3186e407-21c8-f3d1-08ea-0c8750c0ed5c"
        },
        {
          "id": 112081,
          "category": 5,
          "game_id": 386,
          "trusted": true,
          "url": "https://twitter.com/ff_xiv_en",
          "checksum": "6befd253-29cd-92db-40a8-0652ffee7e6e"
        },
        {
          "id": 112082,
          "category": 6,
          "game_id": 386,
          "trusted": true,
          "url": "https://www.twitch.tv/finalfantasyxiv",
          "checksum": "bf80c25e-cbb4-e640-7ed6-c4243559b067"
        },
        {
          "id": 112083,
          "category": 8,
          "game_id": 386,
          "trusted": true,
          "url": "https://www.instagram.com/ffxiv",
          "checksum": "574d8a2c-a853-2431-0c30-f9f6b8c21979"
        },
        {
          "id": 15308,
          "category": 2,
          "game_id": 2963,
          "trusted": false,
          "url": "http://dota.wikia.com/wiki/Defense_of_the_Ancients_Wiki",
          "checksum": "ea3cc3db-40bb-ff29-f135-e9b0fb9084a4"
        },
        {
          "id": 15309,
          "category": 3,
          "game_id": 2963,
          "trusted": true,
          "url": "https://en.wikipedia.org/wiki/Dota_2",
          "checksum": "eea931d9-eb72-a90f-6597-610e429d778a"
        },
        {
          "id": 15310,
          "category": 5,
          "game_id": 2963,
          "trusted": true,
          "url": "https://twitter.com/dota2",
          "checksum": "9ff02b96-c201-0f98-bfff-d6419d4d0acc"
        },
        {
          "id": 15311,
          "category": 13,
          "game_id": 2963,
          "trusted": true,
          "url": "https://store.steampowered.com/app/570",
          "checksum": "59dcf336-33e0-ec6e-3bc8-1f785691f4dd"
        },
        {
          "id": 67099,
          "category": 1,
          "game_id": 2963,
          "trusted": false,
          "url": "http://www.dota2.com/",
          "checksum": "2cd0d45b-e51d-bfcb-f304-cc921f928622"
        },
        {
          "id": 127270,
          "category": 4,
          "game_id": 2963,
          "trusted": true,
          "url": "https://www.facebook.com/dota2",
          "checksum": "ff4fc45f-04b4-febf-6a14-a2a1685d2a5b"
        },
        {
          "id": 127271,
          "category": 8,
          "game_id": 2963,
          "trusted": true,
          "url": "https://www.instagram.com/dota2",
          "checksum": "812012e1-2dd2-6e5e-ba30-d226699551d1"
        },
        {
          "id": 127272,
          "category": 9,
          "game_id": 2963,
          "trusted": true,
          "url": "https://www.youtube.com/user/dota2",
          "checksum": "f787c04d-8024-8a87-9938-55e20e93e5be"
        },
        {
          "id": 127273,
          "category": 14,
          "game_id": 2963,
          "trusted": true,
          "url": "https://www.reddit.com/r/DotA2",
          "checksum": "6f9705aa-08d0-6a94-e629-38b1db8ce728"
        },
        {
          "id": 127274,
          "category": 6,
          "game_id": 2963,
          "trusted": true,
          "url": "https://www.twitch.tv/directory/game/Dota%202",
          "checksum": "b50cc903-f31d-0209-dd0d-23075ab30e1b"
        }
      ]);
    });
};