exports.seed = async function seedAlbumPerformers(knex) {
  try {
    // Deletes ALL existing entries
    await knex("album_performers").del();
    // Inserts seed entries
    await knex("album_performers").insert([
      {
        artist_id: 14867,
        album_id: 76054,
      },
      {
        artist_id: 10393,
        album_id: 76054,
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
