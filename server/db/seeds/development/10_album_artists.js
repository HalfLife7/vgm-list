exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('album_artists').del()
    // Inserts seed entries
    await knex('album_artists').insert([{
        "artist_id": 17925,
        "album_id": 76054,
        "arranger": true,
        "composer": true
      },
      {
        "artist_id": 17926,
        "album_id": 76054,
        "arranger": true
      },
      {
        "artist_id": 10393,
        "album_id": 76054,
        "composer": true,
        "performer": true
      },
      {
        "artist_id": 5455,
        "album_id": 76054,
        "composer": true
      },
      {
        "artist_id": 14867,
        "album_id": 76054,
        "performer": true
      }
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};