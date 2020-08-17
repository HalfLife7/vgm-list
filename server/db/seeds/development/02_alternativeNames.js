exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('alternative_names').del()
    // Inserts seed entries
    await knex('alternative_names').insert([{
        "id": 11337,
        "comment": "Other",
        "game_id": 11800,
        "name": "DOS2",
        "checksum": "41500940-f553-0cab-487b-c7fb5544085e"
      },
      {
        "id": 11338,
        "comment": "Other",
        "game_id": 11800,
        "name": "Divinity: Original Sin 2",
        "checksum": "710d8f67-8d5d-c27f-2714-1f661c443b83"
      },
      {
        "id": 30719,
        "comment": "Portuguese title",
        "game_id": 11800,
        "name": "Divindade: Pecado Original II",
        "checksum": "6635fffa-6605-9254-1eff-d44d84b9c7aa"
      },
      {
        "id": 30720,
        "comment": "Japanese title",
        "game_id": 11800,
        "name": "ディヴィニティ：オリジナル・シン 2",
        "checksum": "f2fbd936-c818-d7b1-0d7c-73b28d9ea9c5"
      },
      {
        "id": 30721,
        "comment": "Korean title",
        "game_id": 11800,
        "name": "신성 : 원죄 II",
        "checksum": "d2bf6d82-3955-1cd6-c15a-bfa61fb624ef"
      },
      {
        "id": 30722,
        "comment": "Chinese title",
        "game_id": 11800,
        "name": "神界：原罪2",
        "checksum": "13c18354-699e-4d58-9554-ef3520d9954e"
      },
      {
        "id": 1552,
        "game_id": 386,
        "name": "Final Fantasy 14",
        "checksum": "c320a7c9-e79a-89b9-2512-fd5d3ca5ac2d"
      },
      {
        "id": 4071,
        "comment": "Japanese title",
        "game_id": 386,
        "name": "ファイナルファンタジーXIV",
        "checksum": "a2a03551-02b1-e17b-900c-3585a351cc6d"
      },
      {
        "id": 14465,
        "comment": "Other",
        "game_id": 386,
        "name": "FFXIV",
        "checksum": "726685bb-6d9f-0cfd-571f-3927dc0a51af"
      },
      {
        "id": 14466,
        "comment": "Other",
        "game_id": 386,
        "name": "FF14",
        "checksum": "065380a0-83b1-4281-8fd1-03e786c5a8a8"
      },
      {
        "id": 14467,
        "comment": "Other",
        "game_id": 386,
        "name": "Final Fantasy XIV Online",
        "checksum": "f316e6f1-07ff-9de2-b4c0-f1471d97627d"
      },
      {
        "id": 8099,
        "comment": "Test Client",
        "game_id": 2963,
        "name": "Dota 2 Test",
        "checksum": "f0803a4e-beef-ef24-5279-ab8da00643a2"
      },
      {
        "id": 13819,
        "comment": "Other",
        "game_id": 2963,
        "name": "Defence of the Ancients 2",
        "checksum": "f8fe074a-2513-2754-d7bf-518ddfcd772b"
      },
      {
        "id": 30516,
        "comment": "Korean title",
        "game_id": 2963,
        "name": "도타 2",
        "checksum": "f03e9420-6830-627e-1c1a-924d73816c3c"
      },
      {
        "id": 30518,
        "comment": "Chinese title",
        "game_id": 2963,
        "name": "刀塔2",
        "checksum": "2fd0b65d-175d-1827-065d-83c104118f83"
      },
      {
        "id": 32016,
        "comment": "Japanese title",
        "game_id": 2963,
        "name": "ドータ・ツー",
        "checksum": "cef129f2-15e3-7f60-d1e1-866a583fd30f"
      },
      {
        "id": 37575,
        "game_id": 2963,
        "name": "Defense of the Ancients 2",
        "checksum": "ffeead55-8cbc-79d4-9629-1e6d7ddfe4ed"
      },
      {
        "id": 37583,
        "comment": "Russian title",
        "game_id": 2963,
        "name": "Защита Древних 2",
        "checksum": "3b1628c2-5170-e26b-5bab-9e946f7d9b99"
      }
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};