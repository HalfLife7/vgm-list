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
          "id": 4912,
          "game_id": 386,
          "height": 1066,
          "image_id": "hfenpeafulfmzw1ny77b",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/hfenpeafulfmzw1ny77b.jpg",
          "width": 1920,
          "checksum": "e2fda2e2-81bf-6fa2-3fa7-a023ef9688c2"
        },
        {
          "id": 4913,
          "game_id": 386,
          "height": 1080,
          "image_id": "zw6ktb6om4hg7jojugdk",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/zw6ktb6om4hg7jojugdk.jpg",
          "width": 1920,
          "checksum": "0c97e478-1aac-a3cf-756f-799438d490dc"
        },
        {
          "id": 4914,
          "game_id": 386,
          "height": 1080,
          "image_id": "oztxlpmbko9l8fla7npj",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/oztxlpmbko9l8fla7npj.jpg",
          "width": 1920,
          "checksum": "1cb4c762-50c7-bcc2-d5cf-880908ff1ac2"
        },
        {
          "id": 4915,
          "game_id": 386,
          "height": 1080,
          "image_id": "jltawzanp9mdup9iegkm",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/jltawzanp9mdup9iegkm.jpg",
          "width": 1920,
          "checksum": "cf8014e2-f254-c246-0366-060f9e9b45f8"
        },
        {
          "id": 4916,
          "game_id": 386,
          "height": 1080,
          "image_id": "crnfwvjwcamqxliclynj",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/crnfwvjwcamqxliclynj.jpg",
          "width": 1920,
          "checksum": "a7396f4e-4f6b-2d1e-c334-6150529efb70"
        },
        {
          "id": 320487,
          "alpha_channel": false,
          "animated": false,
          "game_id": 386,
          "height": 1080,
          "image_id": "sc6vaf",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc6vaf.jpg",
          "width": 1920,
          "checksum": "cbd6d155-499a-b997-ba53-25a65d708011"
        },
        {
          "id": 320488,
          "alpha_channel": false,
          "animated": false,
          "game_id": 386,
          "height": 1080,
          "image_id": "sc6vag",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc6vag.jpg",
          "width": 1920,
          "checksum": "29dba333-7b11-2c9a-d7a4-412f60bab243"
        },
        {
          "id": 320489,
          "alpha_channel": false,
          "animated": false,
          "game_id": 386,
          "height": 768,
          "image_id": "sc6vah",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc6vah.jpg",
          "width": 1364,
          "checksum": "31a5d335-79d8-8106-f6e6-813eb5c4f90c"
        },
        {
          "id": 347031,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc7frr",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc7frr.jpg",
          "width": 1920,
          "checksum": "ba7438d7-293f-77c2-55fa-6892ef940a0b"
        },
        {
          "id": 347032,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc7frs",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc7frs.jpg",
          "width": 1920,
          "checksum": "32716973-aa8f-3bc0-3a07-064c3196849f"
        },
        {
          "id": 347033,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc7frt",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc7frt.jpg",
          "width": 1920,
          "checksum": "352dc7f3-4480-3a3a-6405-899d182a6b06"
        },
        {
          "id": 347034,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc7fru",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc7fru.jpg",
          "width": 1920,
          "checksum": "aa978702-8acf-68d8-64bb-d560a98c6115"
        },
        {
          "id": 383090,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc87le",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc87le.jpg",
          "width": 1920,
          "checksum": "503168ca-7417-545f-0570-4ee61aa4bc68"
        },
        {
          "id": 383091,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc87lf",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc87lf.jpg",
          "width": 1920,
          "checksum": "e2c1b059-6152-b051-4de9-2669099f1311"
        },
        {
          "id": 383092,
          "alpha_channel": false,
          "animated": false,
          "game_id": 2963,
          "height": 1080,
          "image_id": "sc87lg",
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/sc87lg.jpg",
          "width": 1920,
          "checksum": "14b25963-846b-fdb9-fee6-9ab47c30884a"
        }
      ]);
    });
};