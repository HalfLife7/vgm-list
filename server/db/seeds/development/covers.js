exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('covers').del()
    .then(function () {
      // Inserts seed entries
      return knex('covers').insert([{
          "id": 90931,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1057,
          "image_id": "co1y5v",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/co1y5v.jpg",
          "width": 793,
          "checksum": "79bd83c0-3d13-048e-be39-6ede3997f078"
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