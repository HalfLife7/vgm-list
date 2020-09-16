exports.seed = async function seedAlbumGames(knex) {
  try {
    // Deletes ALL existing entries
    await knex("album_games").del();
    // Inserts seed entries
    await knex("album_games").insert([
      {
        game_id: 11800,
        album_id: 76054,
      },
      {
        game_id: 386,
        album_id: 44019,
      },
      {
        game_id: 2963,
        album_id: 68351,
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
