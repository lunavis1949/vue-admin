import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "login"
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/components/Login/index")
        },
        {
            path: "/console",
            name: "console",
            redirect: 'index',
            component: () => import("@/components/Layout/index"),
            children:[
                {
                    path:"/index",
                    name:"index",
                    component:()=>import("@/components/Console/index")
                }
            ]

        }
    ]
})
