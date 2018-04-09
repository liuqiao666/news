import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import jquery from 'jquery';
import infiniteScroll from 'vue-infinite-scroll';
import'../css/app.css';
import index from './components/index.vue';

Vue.use(VueRouter);
Vue.use(infiniteScroll)

Vue.prototype.$http = axios;

Vue.prototype.$jq = require('jquery');

const list = Vue.component('list', require('./components/list.vue'));
const content_page = Vue.component('content_page', require('./components/content.vue'));

const routes = [
  { path: '/', component: list, meta: {page: 'news'}},
  { path: '/activity', component: list, meta: {page: 'activity'}},
  { path: '/tech', component: list, meta: {page: 'tech'}},
  { path: '/story', component: list, meta: {page: 'story'}},
  { path: '/detail/:cate/:id', component: content_page, meta: { detailView: true }}
];

const router = new VueRouter({
	routes: routes
});

const app = new Vue({
	router,
  el: '#app',
  render: h => h(index)
});
