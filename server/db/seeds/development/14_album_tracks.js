exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('album_tracks').del()
    // Inserts seed entries
    await knex('album_tracks').insert([{
        "id": 0,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:39",
        "name": "Divinity: Original Sin 2 (Main Theme)"
      },
      {
        "id": 1,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:40",
        "name": "Mead, Gold and Blood (Ifan's Theme)"
      },
      {
        "id": 2,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:29",
        "name": "Symphony of the Void"
      },
      {
        "id": 3,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:17",
        "name": "Rivellon"
      },
      {
        "id": 4,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:03",
        "name": "Welcome to Fort Joy"
      },
      {
        "id": 5,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:27",
        "name": "A Single Drop of Magic"
      },
      {
        "id": 6,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:43",
        "name": "Reflections from the Past"
      },
      {
        "id": 7,
        "disc_id": 0,
        "album_id": 76054,
        "length": "1:23",
        "name": "Quirky Bones"
      },
      {
        "id": 8,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:26",
        "name": "Dancing with the Source"
      },
      {
        "id": 9,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:23",
        "name": "Dancing with the Source (Cello Version)"
      },
      {
        "id": 10,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:25",
        "name": "Dancing with the Source (Tambura Version)"
      },
      {
        "id": 11,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:25",
        "name": "Dancing with the Source (Bansuri Version)"
      },
      {
        "id": 12,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:24",
        "name": "Dancing with the Source (Oud Version)"
      },
      {
        "id": 13,
        "disc_id": 0,
        "album_id": 76054,
        "length": "4:01",
        "name": "Power of Innocence 2017 (feat. Kirill Pokrovsky) (Orchestra Version)"
      },
      {
        "id": 14,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:46",
        "name": "Reaper's Coast"
      },
      {
        "id": 15,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:17",
        "name": "Rivellon (Light Version)"
      },
      {
        "id": 16,
        "disc_id": 0,
        "album_id": 76054,
        "length": "4:11",
        "name": "A Part of Their Story"
      },
      {
        "id": 17,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:43",
        "name": "Amber Ale"
      },
      {
        "id": 18,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:44",
        "name": "Driftwood"
      },
      {
        "id": 19,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:13",
        "name": "Path of the Godwoken"
      },
      {
        "id": 20,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:13",
        "name": "Path of the Godwoken (Tambura Version)"
      },
      {
        "id": 21,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:13",
        "name": "Path of the Godwoken (Bansuri Version)"
      },
      {
        "id": 22,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:13",
        "name": "Path of the Godwoken (Oud Version)"
      },
      {
        "id": 23,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:13",
        "name": "Path of the Godwoken (Cello Version)"
      },
      {
        "id": 24,
        "disc_id": 0,
        "album_id": 76054,
        "length": "4:37",
        "name": "A Tear in the Veil"
      },
      {
        "id": 25,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:27",
        "name": "Sebille's Theme"
      },
      {
        "id": 26,
        "disc_id": 0,
        "album_id": 76054,
        "length": "4:21",
        "name": "Divine's Lament"
      },
      {
        "id": 27,
        "disc_id": 0,
        "album_id": 76054,
        "length": "4:10",
        "name": "Embrace of the Deathfog"
      },
      {
        "id": 28,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:22",
        "name": "Fane's Theme"
      },
      {
        "id": 29,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:39",
        "name": "Sins and Gods (Choir Version)"
      },
      {
        "id": 30,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:54",
        "name": "Sing for Me (Lohse's Theme) (Bobby's Version)"
      },
      {
        "id": 31,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:00",
        "name": "Red Prince Theme"
      },
      {
        "id": 32,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:33",
        "name": "The Queen's High Seas (Beast's Theme)"
      }, {
        "id": 33,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:27",
        "name": "Sins and Gods: Revelation"
      }, {
        "id": 34,
        "disc_id": 0,
        "album_id": 76054,
        "length": "5:03",
        "name": "The Battle for Divinity"
      }, {
        "id": 35,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:32",
        "name": "Your Tale Awaits You Down the Road"
      }, {
        "id": 36,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:44",
        "name": "Sing for Me (Lohse Version)"
      }, {
        "id": 37,
        "disc_id": 0,
        "album_id": 76054,
        "length": "2:44",
        "name": "Crazy Troubled Senses"
      }, {
        "id": 38,
        "disc_id": 0,
        "album_id": 76054,
        "length": "3:03",
        "name": "Mysterious Trails"
      }, {
        "id": 39,
        "disc_id": 0,
        "album_id": 76054,
        "length": "1:44",
        "name": "Quirky Bones (Murky Version)"
      }, {
        "id": 40,
        "disc_id": 0,
        "album_id": 76054,
        "length": "1:42",
        "name": "The Queen's High Seas (Tavern Version)"
      }, {
        "id": 41,
        "disc_id": 0,
        "album_id": 76054,
        "length": "4:21",
        "name": "Divine's Lament (Bonus Song)"
      }
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};