<template>
  <div class="flex container m-auto pt-20">{{ game.name }}</div>
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
    };
  },
  components: {},
  methods: {
    async loadGameData() {
      await GameDataService.get(this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.game = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async loadAlbumData() {
      this.game.albums.map(async (album) => {
        await AlbumDataService.get(album.id)
          .then((response) => {
            console.log(response.data);
            this.albums.push(response);
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
  },
  async mounted() {
    await this.loadGameData();
    await this.loadAlbumData();
  },
};
</script>
