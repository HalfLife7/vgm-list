<template>
  <div class="home">
    <div
      v-if="headerImage !== null"
      class="w-full bg-cover bg-center h-64 -mt-12 shadow-xl flex justify-center items-center opacity-75"
      :style="{ backgroundImage: `url('${headerImage.url}')` }"
    >
      <div
        v-if="headerImage !== null"
        class="text-center text-white text-6xl text-outline font-sans"
      >
        Home
      </div>
    </div>
    <div
      v-if="headerImage !== null"
      class="text-center text-black text-xl pt-8 pl-8 pr-8 pb-4"
    >
      Check out some of my favourite OSTs or explore on your own!
    </div>
    <div v-if="gameDataIsLoaded" class="flex flex-wrap justify-center">
      <app-game-card
        v-for="(game, index) in games"
        :key="index"
        class="max-w-xs"
        :game="game"
      ></app-game-card>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import GameDataService from "../services/GameDataService";
import GameScreenshotDataService from "../services/GameScreenshotService";
export default {
  name: "Home",
  components: {
    "app-game-card": GameCard,
  },
  data: () => {
    return {
      games: [],
      ids: [5418, 11800, 418, 427, 386, 11208, 426, 2148, 1029],
      gameDataIsLoaded: false,
      headerImage: null,
    };
  },
  async mounted() {
    await this.retrieveGames().then(() => {
      this.gameDataIsLoaded = true;
    });
    await this.retrieveScreenshot().catch((err) => {
      console.error(err);
    });
  },
  mutations: {},
  methods: {
    async retrieveGames() {
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      shuffleArray(this.ids);
      this.ids = this.ids.slice(0, 3);
      for (const gameId of this.ids) {
        await GameDataService.get(gameId)
          .then((response) => {
            if (response.data.summary !== null) {
              delete response.data.summary;
            }

            this.games.push(response.data);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    },
    async retrieveScreenshot() {
      await GameScreenshotDataService.getRandom()
        .then((response) => {
          this.headerImage = response.data;
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  },
};
</script>
