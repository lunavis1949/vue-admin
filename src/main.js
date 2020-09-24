import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";
import "./plugins/element.js";
import axios from "axios";

import './icons/index';

Vue.prototype.$https = axios;
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
