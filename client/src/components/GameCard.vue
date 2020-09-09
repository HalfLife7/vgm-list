<template>
  <div>
    <router-link :to="'/games/' + game.id">
      <div class="max-w-sm rounded overflow-hidden shadow-lg m-5">
        <img class="w-full" :src="game.covers[0].url" alt="Game Cover" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 text-center">{{ game.name }}</div>
          <p class="text-gray-700 text-base text-justify">
            {{ game.summary }}
          </p>
        </div>
        <!-- <div class="px-6 py-4">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >#photography</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >#travel</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            >#winter</span
          >
        </div> -->
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "game-card",
  props: {
    game: {
      type: Object
      // add prop validation
    }
  }
};
</script>
