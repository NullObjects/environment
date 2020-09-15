import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts";
import VueParticles from 'vue-particles'
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.component("v-chart", ECharts);
Vue.use(VueParticles);
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "/api";


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
