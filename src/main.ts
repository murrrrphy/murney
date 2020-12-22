import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.onload = function () {
  // 使页面一开始就在最下方
  setTimeout(function () {
    window.scrollTo(0, 10000);
  }, 0);
  // IOS禁用页面缩放
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
};