<template>
  <div>
    <div class="flex flex-wrap justify-center">
      <app-game-card
        v-for="(game, index) in games"
        :key="index"
        :game="game"
      ></app-game-card>
    </div>
  </div>
</template>

<script>
// TODO: add infinite scroll
import GameCard from "@/components/GameCard.vue";
import GameDataService from "../services/GameDataService";
export default {
  name: "GamesList",
  components: {
    "app-game-card": GameCard,
  },
  data: () => {
    return {
      games: [],
    };
  },
  computed: {
    query() {
      return this.$route.query.name;
    },
  },
  watch: {
    query() {
      if (this.query === undefined) {
        return;
      }
      GameDataService.search(this.query)
        .then((response) => {
          this.games = response.data;
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  },
  mounted() {
    // when page first loads, determine what to show
    if (
      Object.keys(this.$route.query).length === 0 &&
      this.$route.query.constructor === Object
    ) {
      // display default games if no search params
      this.retrieveGames();
    } else {
      // if there a params, search
      this.searchSingle();
    }
  },
  methods: {
    retrieveGames() {
      GameDataService.getAll()
        .then((response) => {
          this.games = response.data;
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    searchSingle() {
      GameDataService.search(this.query)
        .then((response) => {
          this.games = response.data;
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  },
};
</script>
