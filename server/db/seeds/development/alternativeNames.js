exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('alternative_names').del()
    .then(function () {
      // Inserts seed entries
      return knex('alternative_names').insert([{
          "id": 11337,
          "comment": "Other",
          "game": 11800,
          "name": "DOS2",
          "checksum": "41500940-f553-0cab-487b-c7fb5544085e"
        },
        {
          "id": 11338,
          "comment": "Other",
          "game": 11800,
          "name": "Divinity: Original Sin 2",
          "checksum": "710d8f67-8d5d-c27f-2714-1f661c443b83"
        },
        {
          "id": 30719,
          "comment": "Portuguese title",
          "game": 11800,
          "name": "Divindade: Pecado Original II",
          "checksum": "6635fffa-6605-9254-1eff-d44d84b9c7aa"
        },
        {
          "id": 30720,
          "comment": "Japanese title",
          "game": 11800,
          "name": "ディヴィニティ：オリジナル・シン 2",
          "checksum": "f2fbd936-c818-d7b1-0d7c-73b28d9ea9c5"
        },
        {
          "id": 30721,
          "comment": "Korean title",
          "game": 11800,
          "name": "신성 : 원죄 II",
          "checksum": "d2bf6d82-3955-1cd6-c15a-bfa61fb624ef"
        },
        {
          "id": 30722,
          "comment": "Chinese title",
          "game": 11800,
          "name": "神界：原罪2",
          "checksum": "13c18354-699e-4d58-9554-ef3520d9954e"
        },
        {
          id: 2,
          colName: 'rowValue2'
        },
        {
          id: 3,
          colName: 'rowValue3'
        }
      ]);
    });
};