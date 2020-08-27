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
  directives: {
    // "click-outside": {
    //   bind() {
    //     this.event = (event) => this.vm.$emit(this.expression, event);
    //     this.el.addEventListener("click", this.stopProp);
    //     document.body.addEventListener("click", this.event);
    //   },
    //   unbind() {
    //     this.el.removeEventListener("click", this.stopProp);
    //     document.body.removeEventListener("click", this.event);
    //   },
    //   stopProp(event) {
    //     event.stopPropagation();
    //   },
    // },
  },
};
</script>
