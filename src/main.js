import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vcolorpicker from "vcolorpicker";
Vue.config.productionTip = false;
Vue.use(vcolorpicker);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
