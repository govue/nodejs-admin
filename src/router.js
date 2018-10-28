import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Register from "./views/Register";
import NoFound from "./views/404";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "*",
      name: "NoFound",
      component: NoFound
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
