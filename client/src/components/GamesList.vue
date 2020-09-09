<template>
  <div>
    <div class="flex flex-wrap justify-center">
      <app-game-card
        v-for="(game, index) in games"
        :game="game"
        :key="index"
      ></app-game-card>
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import GameDataService from "../services/GameDataService";
export default {
  name: "games-list",
  data: () => {
    return {
      games: []
    };
  },
  components: {
    "app-game-card": GameCard
  },
  computed: {
    query() {
      return this.$route.query.name;
    }
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
    },
    // TODO: fix duplicate card bug
    searchSingle() {
      GameDataService.search(this.query)
        .then(response => {
          this.games = response.data;
          console.log("searchSingle");
          console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    console.log("This component is mounted!");
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
  watch: {
    query() {
      console.log("starting watch:query");
      console.log(this.query);
      console.log(this.$route.query);
      console.log(this.$route.query.name);
      if (this.query === undefined) {
        return;
      }
      GameDataService.search(this.query)
        .then(response => {
          this.games = response.data;
          console.log("watcher");
          console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
