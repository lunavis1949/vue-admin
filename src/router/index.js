import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login")
  },
  {
    path: "/last",
    name: "last",
    component: () => import("@/views/Last")
  }
];

const router = new VueRouter({
  routes
});

export default router;
