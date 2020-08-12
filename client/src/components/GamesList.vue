<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      :class="{ active: index == currentIndex }"
      v-for="(game, index) in games"
      :key="index"
      @click="setActiveGame(game, index)"
    >
      {{ game.title }}
    </li>
  </ul>
</template>

<script>
import GameDataService from "../services/GameDataService";
export default {
  name: "games-list",
  data() {
    return {
      games: [],
      currentGame: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveGames() {
      GameDataService.getAll()
        .then(response => {
          this.games = response.data;
          console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.retrieveGames;
  }
};
</script>
