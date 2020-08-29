<template>
  <div id="app">
    <app-nav-bar> </app-nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "app",
  components: {
    "app-nav-bar": NavBar,
  },
};
</script>
