<template>
  <div>
    <ul>
      <li v-for="(game, index) in games" :key="index">
        {{ game.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import GameDataService from "../services/GameDataService";
export default {
  name: "games-list",
  data() {
    return {
      games: [],
    };
  },
  methods: {
    retrieveGames() {
      GameDataService.getAll()
        .then((response) => {
          this.games = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.retrieveGames();
  },
};
</script>
