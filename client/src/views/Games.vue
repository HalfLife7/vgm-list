<template>
  <div>
    <games-list></games-list>
  </div>
</template>

<script>
import GamesList from "@/components/GamesList.vue";
export default {
  name: "Games",
  components: {
    "games-list": GamesList,
  },
};
</script>
