import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // scroll top top of page on route changes
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    // {
    //   path: "/about",
    //   name: "About",
    //   component: () => import("../views/About.vue")
    // },
    {
      path: "/games",
      name: "Games",
      component: () => import("../views/Games.vue"),
      children: [
        {
          path: "search",
          component: () => import("../views/Games.vue"),
        },
      ],
    },
    {
      path: "/games/:id",
      name: "Game",
      component: () => import("../views/Game.vue"),
    },
  ],
});
