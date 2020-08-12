<template>
  <div class="GamesList">
    <h1>This is the games page</h1>
    <GamesList />
  </div>
</template>

<script>
import GamesList from "@/components/GamesList.vue";
export default {
  name: "Games",
  components: {
    GamesList,
  },
};
</script>
