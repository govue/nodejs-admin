import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import axios from './http'; // 在axios中配置了路由拦截，能实现在axios请求和响应时调用loading动画和message提示
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
