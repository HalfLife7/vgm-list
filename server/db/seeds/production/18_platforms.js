exports.seed = async function seedPlatforms(knex) {
  try {
    // Deletes ALL existing entries
    await knex("platforms").del();
    // Inserts seed entries
    await knex("platforms").insert([
      {
        id: 3,
        abbreviation: "Linux",
        alternative_name: "GNU/Linux",
        category: 4,
        name: "Linux",
        slug: "linux",
        updated_at: 1392940800,
        url: "https://www.igdb.com/platforms/linux",
        checksum: "51b13de3-9c50-25eb-de47-5414bc877fb0",
      },
      {
        id: 6,
        abbreviation: "PC",
        alternative_name: "mswin",
        category: 4,
        name: "PC (Microsoft Windows)",
        slug: "win",
        updated_at: 1470009600,
        url: "https://www.igdb.com/platforms/win",
        checksum: "ec4bee36-3fd4-fa32-1780-54ca570298c2",
      },
      {
        id: 14,
        abbreviation: "Mac",
        alternative_name: "Mac OS",
        category: 4,
        name: "Mac",
        slug: "mac",
        updated_at: 1394236800,
        url: "https://www.igdb.com/platforms/mac",
        checksum: "d83efdd9-85db-bf2f-e8a4-cfec9eabfcfe",
      },
      {
        id: 9,
        abbreviation: "PS3",
        category: 1,
        name: "PlayStation 3",
        slug: "ps3",
        updated_at: 1391558400,
        url: "https://www.igdb.com/platforms/ps3",
        checksum: "1891a74d-d721-aba2-b0ec-5242d0e2eb63",
      },
      {
        id: 48,
        abbreviation: "PS4",
        alternative_name: "PS4",
        category: 1,
        name: "PlayStation 4",
        slug: "ps4--1",
        updated_at: 1433116800,
        url: "https://www.igdb.com/platforms/ps4--1",
        checksum: "7fa91e63-fce5-3cc9-4ec8-94283d3185c3",
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
