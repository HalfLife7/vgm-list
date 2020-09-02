exports.seed = async function seedArtists(knex) {
  try {
    // Deletes ALL existing entries
    await knex('artists').del();
    // Inserts seed entries
    await knex('artists').insert([{
      id: 17925,
      name: 'Victor Stoyanov',
    },
    {
      id: 17926,
      name: 'Georgi Andreev',
    },
    {
      id: 10393,
      name: 'Borislav Slavov',
    },
    {
      id: 5455,
      name: 'Kirill Pokrovsky',
    },
    {
      id: 14867,
      name: 'Hungarian Studio Orchestra',
    },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
