import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout/index";

Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "login",
            hidden:true,
            meta:{
                name:'主页'
            }
        },
        {
            path: "/login",
            name: "login",
            hidden:true,
            meta:{
                name:'登录'
            },
            component: () => import("@/components/Login/index")
        },
        {
            path: "/console",
            name: "console",
            redirect: 'index',
            meta:{
                name:'控制页',
                icon:'console'
            },
            component: Layout,
            children:[
                {
                    path:"/index",
                    name:"index",
                    meta:{
                        name:'首页'
                    },
                    component:()=>import("@/components/Console/index")
                }
            ]

        },
        //信息管理
        {
            path: "/info",
            name: "Info",
            redirect: 'index',
            meta:{
                name:'信息管理',
                icon:'info'
            },
            component: Layout,
            children:[
                {
                    path:"/infoIndex",
                    name:"InfoIndex",
                    meta:{
                        name:'信息列表'
                    },
                    component:()=>import("@/components/Info/index")
                },
                {
                    path:"/infoCategory",
                    name:"InfoCategory",
                    meta:{
                        name:'信息分类'
                    },
                    component:()=>import("@/components/Info/category")
                }
            ]

        },
        //用户管理
        {
            path: "/user",
            name: "User",
            redirect: 'index',
            meta:{
                name:'用户管理',
                icon:'user'
            },
            component: Layout,
            children:[
                {
                    path:"/userIndex",
                    name:"UserIndex",
                    meta:{
                        name:'用户列表'
                    },
                    component:()=>import("@/components/User/index")
                }
            ]

        }
    ]
})
