<template>
  <div id="app" class="font-sans">
    <nav-bar></nav-bar>
    <router-view class="min-h-router-view"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    "nav-bar": NavBar,
    "app-footer": Footer,
  },
};
</script>
