exports.seed = async function seedPlatformLogos(knex) {
  try {
    // Deletes ALL existing entries
    await knex("platform_logos").del();
    // Inserts seed entries
    await knex("platform_logos").insert([
      {
        id: 203,
        platform_id: 6,
        alpha_channel: false,
        animated: false,
        height: 1024,
        image_id: "irwvwpl023f8y19tidgq",
        url:
          "//images.igdb.com/igdb/image/upload/t_thumb/irwvwpl023f8y19tidgq.jpg",
        width: 1024,
        checksum: "fffa9b9e-d229-a54a-fa40-acd8b01cdd93",
      },
      {
        id: 380,
        platform_id: 3,
        alpha_channel: false,
        animated: false,
        height: 512,
        image_id: "plak",
        url: "//images.igdb.com/igdb/image/upload/t_thumb/plak.jpg",
        width: 512,
        checksum: "4237e84e-7209-671d-7c0f-18552941c463",
      },
      {
        id: 100,
        platform_id: 14,
        alpha_channel: true,
        animated: false,
        height: 1024,
        image_id: "jl4t4o64uv2gizj2dxsy",
        url:
          "//images.igdb.com/igdb/image/upload/t_thumb/jl4t4o64uv2gizj2dxsy.jpg",
        width: 1024,
        checksum: "42ba12a5-aade-6754-104b-735f02943ff3",
      },
      {
        id: 79,
        platform_id: 9,
        alpha_channel: false,
        animated: false,
        height: 269,
        image_id: "tuyy1nrqodtmbqajp4jg",
        url:
          "//images.igdb.com/igdb/image/upload/t_thumb/tuyy1nrqodtmbqajp4jg.jpg",
        width: 640,
        checksum: "6d4e051d-bcb1-4d78-5d5f-5aacdb746a25",
      },
      {
        id: 231,
        platform_id: 48,
        alpha_channel: true,
        animated: false,
        height: 1000,
        image_id: "pl6f",
        url: "//images.igdb.com/igdb/image/upload/t_thumb/pl6f.jpg",
        width: 1000,
        checksum: "ec1a886a-332b-9cd7-4e0c-e81856420d3a",
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
