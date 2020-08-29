import {
  createRouter,
  createWebHistory
} from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("../views/Games.vue"),
    beforeEnter: (next) => {
      // ...
      console.log("before entering");
      next;
    },
    children: [{
      path: 'search',
      component: () => import("../views/Games.vue"),
    }, ]
  },
  {
    path: '/games/:id',
    name: 'Game',
    component: () => import("../views/Game.vue")

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;