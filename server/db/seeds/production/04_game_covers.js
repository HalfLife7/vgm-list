exports.seed = async function seedGameCovers(knex) {
  try {
    // Deletes ALL existing entries
    await knex('game_covers').del();
    // Inserts seed entries
    await knex('game_covers').insert([{
      id: 90931,
      alpha_channel: false,
      animated: false,
      game_id: 11800,
      height: 1057,
      image_id: 'co1y5v',
      url: '//images.igdb.com/igdb/image/upload/t_thumb/co1y5v.jpg',
      width: 793,
      checksum: '79bd83c0-3d13-048e-be39-6ede3997f078',
    },
    {
      id: 85225,
      alpha_channel: false,
      animated: false,
      game_id: 386,
      height: 800,
      image_id: 'co1trd',
      url: '//images.igdb.com/igdb/image/upload/t_thumb/co1trd.jpg',
      width: 600,
      checksum: 'f5d87456-0339-ce4a-34c0-439b7005e137',
    },
    {
      id: 90923,
      alpha_channel: false,
      animated: false,
      game_id: 2963,
      height: 1600,
      image_id: 'co1y5n',
      url: '//images.igdb.com/igdb/image/upload/t_thumb/co1y5n.jpg',
      width: 1200,
      checksum: 'eb2ae493-56ff-2c88-3e47-1f7ec34d835f',
    },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
