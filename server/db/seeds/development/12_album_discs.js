exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('album_discs').del()
    // Inserts seed entries
    await knex('album_discs').insert([{
      "id": 0,
      "album_id": 76054,
      "length": "127:54",
      "name": "Disc 1"
    }]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};