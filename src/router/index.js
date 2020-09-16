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
    component: () => import("@/components/Login/Login")
  },
  {
    path: "/last",
    name: "last",
    component: () => import("@/components/Last")
  }
];

const router = new VueRouter({
  routes
});

export default router;
