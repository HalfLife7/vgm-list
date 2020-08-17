exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('videos').del()
    // Inserts seed entries
    await knex('videos').insert([{
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
        "id": 1301,
        "game_id": 386,
        "name": "Trailer",
        "video_id": "Bjg-YOFt5Oo",
        "checksum": "958cf8c9-b664-83b5-5e72-f70c1817c23b"
      },
      {
        "id": 1302,
        "game_id": 386,
        "name": "Trailer",
        "video_id": "oYMrFXcqvk4",
        "checksum": "ff09c72b-9bb7-a6ce-8160-b1cc8816b534"
      },
      {
        "id": 28862,
        "game_id": 386,
        "name": "Trailer",
        "video_id": "lFRYEpH1d-U",
        "checksum": "784cb321-e340-51d4-a348-4df9407795dd"
      },
      {
        "id": 1510,
        "game_id": 2963,
        "name": "Trailer",
        "video_id": "-cSFPIwMEq4",
        "checksum": "578feee9-b178-d97b-0e99-fbce9b17ac58"
      },
      {
        "id": 6303,
        "game_id": 2963,
        "name": "Trailer",
        "video_id": "Cp8neRiF9-k",
        "checksum": "ed5a93c5-6c41-e078-48ad-a6424a1b27d9"
      },
      {
        "id": 6304,
        "game_id": 2963,
        "name": "Trailer",
        "video_id": "0g5NpKONAmk",
        "checksum": "7d746b2a-db3d-f068-1ff6-be0b9b2606f8"
      },
      {
        "id": 6305,
        "game_id": 2963,
        "name": "Trailer",
        "video_id": "8Kqap9-NWD8",
        "checksum": "c4dd5a8b-3f2b-e29a-a5d6-1ee7bbcf135b"
      },
      {
        "id": 19024,
        "game_id": 2963,
        "name": "Gameplay Trailer",
        "video_id": "rXJvB3LFQ4U",
        "checksum": "c95795cf-a76a-8486-c6a9-57c0464bd928"
      },
      {
        "id": 19025,
        "game_id": 2963,
        "name": "Trailer",
        "video_id": "LDTy9kCV5Vg",
        "checksum": "6765d01e-e283-61a3-f44e-a7acbf0a378e"
      },
      {
        "id": 35586,
        "game_id": 2963,
        "name": "Trailer",
        "video_id": "DXBpMy9VgNU",
        "checksum": "b8164569-afc3-8118-3301-3f99dfaa95f2"
      }
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};