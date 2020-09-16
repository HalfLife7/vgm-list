exports.seed = async function seedPlatforms(knex) {
  try {
    // Deletes ALL existing entries
    await knex("collections").del();
    // Inserts seed entries
    await knex("collections").insert([
      {
        id: 1024,
        created_at: 1407715200,
        name: "Divinity",
        slug: "divinity",
        updated_at: 1407715200,
        url: "https://www.igdb.com/collections/divinity",
        checksum: "1f5ce2c6-b7be-9687-f3d5-692ef0b16517",
      },
      {
        id: 39,
        created_at: 1300320000,
        name: "Final Fantasy",
        slug: "final-fantasy",
        updated_at: 1323216000,
        url: "https://www.igdb.com/collections/final-fantasy",
        checksum: "d120a5d1-da5c-99d7-80e0-4563606e0e12",
      },
      {
        id: 556,
        created_at: 1382140800,
        name: "Defense of the Ancients",
        slug: "defense-of-the-ancients",
        updated_at: 1382140800,
        url: "https://www.igdb.com/collections/defense-of-the-ancients",
        checksum: "ee936482-674d-e03e-296e-0c2dfbfd938f",
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
