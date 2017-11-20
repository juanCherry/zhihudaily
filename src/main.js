// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'
import qs from 'qs'
import router from './router/router'
// Vue.use(VueRouter)
import store from './vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// 地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'fc969c7618f939cc03c8ba4ae5f0ddeb',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geolocation']
});


import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,  //预加载高度比例
  error: './img/error.jpg',  //图片路径错误时加载的图片
  // loading: 'http://images.cnitblog.com/i/380433/201407/181623432879480.gif',
  attempt: 1,  //尝试加载图片数量
  listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
})


// import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.prototype.qs = qs;
Vue.prototype.axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
