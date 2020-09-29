exports.seed = async function seedAlbumComposers(knex) {
  try {
    // Deletes ALL existing entries
    await knex("album_composers").del();
    // Inserts seed entries
    await knex("album_composers").insert([
      {
        artist_id: 10393,
        album_id: 76054,
      },
      {
        artist_id: 17925,
        album_id: 76054,
      },
      {
        artist_id: 5455,
        album_id: 76054,
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
