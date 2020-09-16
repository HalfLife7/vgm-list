exports.seed = async function seedAlbumArrangers(knex) {
  try {
    // Deletes ALL existing entries
    await knex("album_arrangers").del();
    // Inserts seed entries
    await knex("album_arrangers").insert([
      {
        artist_id: 17925,
        album_id: 76054,
      },
      {
        artist_id: 17926,
        album_id: 76054,
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
