exports.seed = async function seedAlbumStores(knex) {
  try {
    // Deletes ALL existing entries
    await knex('album_stores').del();
    // Inserts seed entries
    await knex('album_stores').insert([{
      album_id: 76054,
      link: 'http://itunes.apple.com/album/divinity-original-sin-2-original-soundtrack/1357654190',
      name: 'iTunes',
    },
    {
      album_id: 76054,
      link: 'http://play.google.com/store/music/album/Borislav_Slavov_Divinity_Original_Sin_2_Original_S?id=B7v2nxxwqmweffhsyuuhsyuexki',
      name: 'Google Play',
    },
    {
      album_id: 76054,
      link: 'http://www.amazon.com/exec/obidos/ASIN/B07BC4YR7S/',
      name: 'Amazon',
    },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
