import Vue from "vue";
import VueRouter from "vue-router";
import G6 from "../components/G6";
import T1 from "../components/HelloWorld";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: T1,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/G6.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
