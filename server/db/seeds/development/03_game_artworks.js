exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('game_artworks').del()
    // Inserts seed entries
    await knex('game_artworks').insert([{
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
        "id": 1468,
        "game_id": 2963,
        "height": 750,
        "image_id": "q6dxlfgq7e01ktv2zejz",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/q6dxlfgq7e01ktv2zejz.jpg",
        "width": 1260,
        "checksum": "14bb6db4-242d-c1cd-0e26-874445496ff6"
      },
      {
        "id": 1469,
        "game_id": 2963,
        "height": 850,
        "image_id": "jkn8kluhsmxnnauyjvna",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/jkn8kluhsmxnnauyjvna.jpg",
        "width": 1260,
        "checksum": "8b23df46-3c97-708f-cc4f-de3300b7150e"
      },
      {
        "id": 1470,
        "game_id": 2963,
        "height": 710,
        "image_id": "u8iuxjya1eikvd6oeluy",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/u8iuxjya1eikvd6oeluy.jpg",
        "width": 1260,
        "checksum": "e391627c-f755-0870-9017-c0e24c35b806"
      },
      {
        "id": 1471,
        "game_id": 2963,
        "height": 710,
        "image_id": "djbnijqxw24h2iip4ejr",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/djbnijqxw24h2iip4ejr.jpg",
        "width": 1260,
        "checksum": "fe8dc430-897e-4537-cd88-ac30dd6b760f"
      },
      {
        "id": 1472,
        "game_id": 2963,
        "height": 710,
        "image_id": "oqcplb5mghu31srquwv4",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/oqcplb5mghu31srquwv4.jpg",
        "width": 1260,
        "checksum": "149c8dcc-c808-db04-17f9-3930235063cf"
      },
      {
        "id": 1473,
        "game_id": 2963,
        "height": 650,
        "image_id": "pk7xsuysk3ijkuavfyr5",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/pk7xsuysk3ijkuavfyr5.jpg",
        "width": 1260,
        "checksum": "f15f7422-890d-78f2-74e9-234c2d067d3f"
      },
      {
        "id": 1475,
        "game_id": 2963,
        "height": 710,
        "image_id": "zyihbvbrmw0vrguwm2kv",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/zyihbvbrmw0vrguwm2kv.jpg",
        "width": 1260,
        "checksum": "a8cd1456-e529-fdec-1eec-caf812188395"
      },
      {
        "id": 1476,
        "game_id": 2963,
        "height": 710,
        "image_id": "a1yfxsbvlvr6ytfcv5pm",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/a1yfxsbvlvr6ytfcv5pm.jpg",
        "width": 1260,
        "checksum": "277a3a52-d825-0a17-2fe6-0b4abaa76eca"
      },
      {
        "id": 1477,
        "game_id": 2963,
        "height": 710,
        "image_id": "oqsdkzo10pkixwe48omt",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/oqsdkzo10pkixwe48omt.jpg",
        "width": 1260,
        "checksum": "a76848a6-31dc-944b-409f-c02c0ad55ba1"
      },
      {
        "id": 1478,
        "game_id": 2963,
        "height": 1000,
        "image_id": "cjnk8hraz8zbaxpzshxd",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/cjnk8hraz8zbaxpzshxd.jpg",
        "width": 1200,
        "checksum": "a671fe66-7577-fe26-7f3f-8a916a0de82e"
      },
      {
        "id": 1479,
        "game_id": 2963,
        "height": 710,
        "image_id": "qcu2ys1jqyfcfoj9bxeo",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/qcu2ys1jqyfcfoj9bxeo.jpg",
        "width": 1260,
        "checksum": "b0ccae1e-01c6-d63b-c4f3-77e450b94f75"
      },
      {
        "id": 5803,
        "alpha_channel": false,
        "animated": false,
        "game_id": 2963,
        "height": 881,
        "image_id": "ar4h7",
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/ar4h7.jpg",
        "width": 1248,
        "checksum": "dda1f58e-4da4-de15-a36a-bee9218d25fe"
      }
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};