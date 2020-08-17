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
          "id": 386,
          "aggregated_rating": 85.3333333333333,
          "aggregated_rating_count": 13,
          "category": 0,
          "first_release_date": 1377561600,
          "name": "Final Fantasy XIV: A Realm Reborn",
          "slug": "final-fantasy-xiv-a-realm-reborn",
          "summary": "Take part in an epic and ever-changing Final Fantasy as you adventure and explore with friends from around the world. Final Fantasy XIV: A Realm Reborn is a massively multiplayer online role-playing game (MMORPG) that takes the wonder of the Final Fantasy legacy and expands it, allowing you to explore the realm of Eorzea like never before in a Final Fantasy game. \n \nForge friendships, mount chocobos, and board airships as you and your companions create your own unique stories in Eorzea. Adventure alone or join up with friends to undertake epic quests, battle familiar Final Fantasy monsters, and acquire unique abilities and equipment. \n \nAll the classic elements from the series that you have come to know and love are waiting! Embark of the adventure of a lifetime to help reforge the fate of Eorzea!"
        },
        {
          "id": 2963,
          "aggregated_rating": 90.5,
          "aggregated_rating_count": 5,
          "category": 0,
          "first_release_date": 1373328000,
          "name": "Dota 2",
          "slug": "dota-2",
          "summary": "Dota 2 is a multiplayer online battle arena video game and the stand-alone sequel to the Defense of the Ancients (DotA) mod. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on a life of its own.",
        }
      ]);
    });
};