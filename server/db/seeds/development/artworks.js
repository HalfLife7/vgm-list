exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('artworks').del()
    .then(function () {
      // Inserts seed entries
      return knex('artworks').insert([{
          "id": 2176,
          "game_id": 11800,
          "height": 1375,
          "image_id": "v2iccd9jw2kesyag0t5z",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/v2iccd9jw2kesyag0t5z.jpg",
          "width": 1100,
          "checksum": "911c4e04-0739-baeb-58ec-824f4a69cac3"
        },
        {
          "id": 2178,
          "game_id": 11800,
          "height": 1260,
          "image_id": "osqnjpwfnwzlx03vaex1",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/osqnjpwfnwzlx03vaex1.jpg",
          "width": 1260,
          "checksum": "07893057-2ba5-a028-c9d2-9a5f582d194a"
        },
        {
          "id": 2179,
          "game_id": 11800,
          "height": 740,
          "image_id": "gzry3xnjhjggmixgyk3h",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/gzry3xnjhjggmixgyk3h.jpg",
          "width": 1260,
          "checksum": "0ab3fcb4-dd19-7a67-3b79-fea95ae78ed3"
        },
        {
          "id": 2180,
          "game_id": 11800,
          "height": 710,
          "image_id": "v8wt56n9mk4biemrjzm8",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/v8wt56n9mk4biemrjzm8.jpg",
          "width": 1260,
          "checksum": "c3f45687-f37c-4321-06e0-db15619e09c7"
        },
        {
          "id": 5794,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1272,
          "image_id": "ar4gy",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4gy.jpg",
          "width": 1800,
          "checksum": "5328be42-7ddc-c891-1bd8-cfb2a9140ca8"
        },
        {
          "id": 5795,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1272,
          "image_id": "ar4gz",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4gz.jpg",
          "width": 1800,
          "checksum": "a81948bc-af98-8f4d-6730-6b8b4f1b7d14"
        },
        {
          "id": 5796,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1272,
          "image_id": "ar4h0",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4h0.jpg",
          "width": 1800,
          "checksum": "f83b1ba9-b900-6791-c052-1dd3d2dd04b5"
        },
        {
          "id": 5797,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 2160,
          "image_id": "ar4h1",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4h1.jpg",
          "width": 3056,
          "checksum": "01d8d673-6975-e50b-7cb8-9d7cf67baae8"
        },
        {
          "id": 5798,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1272,
          "image_id": "ar4h2",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4h2.jpg",
          "width": 1800,
          "checksum": "759dda7f-43bc-cd37-1a82-7149e8546d14"
        },
        {
          "id": 5799,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1272,
          "image_id": "ar4h3",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4h3.jpg",
          "width": 1800,
          "checksum": "ef3e3857-331c-2874-15ad-ef5a70111d66"
        },
        {
          "id": 5800,
          "alpha_channel": false,
          "animated": false,
          "game_id": 11800,
          "height": 1272,
          "image_id": "ar4h4",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4h4.jpg",
          "width": 1800,
          "checksum": "86ea09b1-1808-77f2-367f-704a333dadec"
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