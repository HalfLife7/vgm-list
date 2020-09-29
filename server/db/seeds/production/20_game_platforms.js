exports.seed = async function seedGamePlatforms(knex) {
  try {
    // Deletes ALL existing entries
    await knex("game_platforms").del();
    // Inserts seed entries
    await knex("game_platforms").insert([
      {
        game_id: 11800,
        platform_id: 6,
      },
      {
        game_id: 11800,
        platform_id: 14,
      },
      {
        game_id: 386,
        platform_id: 6,
      },
      {
        game_id: 386,
        platform_id: 9,
      },
      {
        game_id: 386,
        platform_id: 48,
      },
      {
        game_id: 2963,
        platform_id: 3,
      },
      {
        game_id: 2963,
        platform_id: 6,
      },
      {
        game_id: 2963,
        platform_id: 14,
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
