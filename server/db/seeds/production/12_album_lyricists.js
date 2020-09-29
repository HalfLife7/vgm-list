exports.seed = async function seedAlbumLyricsts(knex) {
  try {
    // Deletes ALL existing entries
    await knex("album_lyricists").del();
    // Inserts seed entries
    await knex("album_lyricists").insert([]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
