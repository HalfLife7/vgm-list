<template>
  <div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg m-5">
      <router-link :to="'/games/' + game.id">
        <img class="w-full" :src="game.covers[0].url" alt="Game Cover" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 text-center">{{ game.name }}</div>
          <p class="text-gray-700 text-base text-justify">
            {{ game.summary }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    game: {
      type: Object,
      // add prop validation
    },
  },
};
</script>
