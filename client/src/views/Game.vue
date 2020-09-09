<template>
  <div class="flex container m-auto pt-20">
    <div class="w-1/5 bg-gray-400">
      <img
        class="w-full"
        :src="game.covers[0].url"
        v-if="gameDataIsLoaded"
        alt="Game Cover"
      />
    </div>
    <div class="w-3/5 bg-gray-500" v-if="gameDataIsLoaded">
      <div class="text-6xl">{{ game.name }}</div>
      <div class="text-xl">Release Date: {{ game.first_release_date }}</div>
      <div class="text-base">{{ game.summary }}</div>
    </div>
    <div class="w-1/5 bg-gray-400"></div>
  </div>
</template>

<script>
import GameDataService from "../services/GameDataService";
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "Game",
  data: () => {
    return {
      game: {},
      albums: [],
      gameDataIsLoaded: false,
      albumDataIsLoaded: false
    };
  },
  components: {},
  methods: {
    async loadGameData() {
      await GameDataService.get(this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.game = response.data;
          this.gameDataIsLoaded = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async loadAlbumData() {
      this.game.albums.map(async album => {
        await AlbumDataService.get(album.id)
          .then(response => {
            console.log(response.data);
            this.albums.push(response);
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  },
  async mounted() {
    await this.loadGameData();
    await this.loadAlbumData();
  }
};
</script>
