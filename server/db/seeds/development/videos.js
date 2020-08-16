exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('videos').del()
    .then(function () {
      // Inserts seed entries
      return knex('videos').insert([{
          "id": 9564,
          "game_id": 11800,
          "name": "Early Access Announcement Trailer",
          "video_id": "4W9jjFv5MnQ",
          "checksum": "1b36851b-7a68-a1ea-78f9-6cb5da4cdf63"
        },
        {
          "id": 15630,
          "game_id": 11800,
          "name": "Trailer",
          "video_id": "bTWTFX8qzPI",
          "checksum": "d7ac7059-35dc-9247-29d6-f2468a04a4f1"
        },
        {
          "id": 15817,
          "game_id": 11800,
          "name": "Trailer",
          "video_id": "xL7_U7oWJzk",
          "checksum": "93b7e5e8-61fe-1ecf-b8ab-1eb715b53200"
        },
        {
          "id": 18905,
          "game_id": 11800,
          "name": "Console Announcement Trailer",
          "video_id": "3lMUaCh9CiM",
          "checksum": "8fb7ed53-f472-3e64-2670-97a1238b8830"
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