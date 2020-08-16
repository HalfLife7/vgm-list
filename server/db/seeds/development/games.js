exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([{
          "id": 11800,
          "aggregated_rating": 91.3076923076923,
          "aggregated_rating_count": 17,
          "category": 0,
          "first_release_date": 1505347200,
          "name": "Divinity: Original Sin II",
          "slug": "divinity-original-sin-ii",
          "summary": "Divinity: Original Sin II is a single- and multiplayer top-down, party-based role-playing game with pen & paper RPG-like levels of freedom.It features turn-based combat, a strong focus on systematic gameplay and a well-grounded narrative. \n \nDivinity: Original Sin 2 is the sequel to the critically acclaimed Divinity: Original Sin, winner of over 150 Game of the Year awards and nominations."
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