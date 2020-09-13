exports.seed = async function seedAlbumCovers(knex) {
  try {
    // Deletes ALL existing entries
    await knex("album_covers").del();
    // Inserts seed entries
    await knex("album_covers").insert([
      {
        id: 1520785680,
        album_id: 76054,
        full: "https://media.vgm.io/albums/45/76054/76054-1520785680.jpg",
        medium:
          "https://medium-media.vgm.io/albums/45/76054/76054-1520785680.jpg",
        thumb:
          "https://thumb-media.vgm.io/albums/45/76054/76054-1520785680.jpg",
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
