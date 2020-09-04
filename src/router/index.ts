import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import EnvironmentView from "../views/EnvironmentView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "EnvironmentView",
    component: EnvironmentView
  },
  {
    path: "/device",
    name: "DeviceStatusView",
    component: () => import("../views/DeviceStatusView.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
