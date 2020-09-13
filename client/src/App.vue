<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
export default {
  name: "app",
  components: {
    "nav-bar": NavBar,
    "app-footer": Footer
  }
};
</script>
