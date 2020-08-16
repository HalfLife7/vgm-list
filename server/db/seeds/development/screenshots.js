exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('screenshots').del()
    .then(function () {
      // Inserts seed entries
      return knex('screenshots').insert([{
          "id": 12646,
          "game_id": 11800,
          "height": 1374,
          "image_id": "dfeszjzcbjnampiuyrm1",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/dfeszjzcbjnampiuyrm1.jpg",
          "width": 2559,
          "checksum": "8cb61578-5d9e-4021-cd4c-1ff423db7260"
        },
        {
          "id": 12647,
          "game_id": 11800,
          "height": 1379,
          "image_id": "xlfpypdtnqdnzkrnmqlz",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/xlfpypdtnqdnzkrnmqlz.jpg",
          "width": 2560,
          "checksum": "4d89d455-cb20-275b-ac04-61ca0e25dbe0"
        },
        {
          "id": 12648,
          "game_id": 11800,
          "height": 1374,
          "image_id": "zpxr5rzkzxzg1fncnigi",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/zpxr5rzkzxzg1fncnigi.jpg",
          "width": 2559,
          "checksum": "7e7db519-bbaf-692b-bfb5-a0706b102cdf"
        },
        {
          "id": 12649,
          "game_id": 11800,
          "height": 1357,
          "image_id": "kqthxnii1vaqcafk81sb",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/kqthxnii1vaqcafk81sb.jpg",
          "width": 2552,
          "checksum": "3ec51b40-6007-6bce-5e50-3b94b45bbf11"
        },
        {
          "id": 12650,
          "game_id": 11800,
          "height": 1374,
          "image_id": "cvhhkfnz77nfalywwfcl",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/cvhhkfnz77nfalywwfcl.jpg",
          "width": 2552,
          "checksum": "5b7e183d-ea14-168d-9ed2-8cd4091687a8"
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