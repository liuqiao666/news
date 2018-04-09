<template>
  <div class="content">
    <div class="top">
      <div>
        <img class="logo" src="/img/ce.png">
        <p><a href="http://ce.cduestc.cn" target="_blank">电子科技大学成都学院·计算机系</a></p>
      </div>
      <div class="top-nav">
        <p><a href="http://ce.cduestc.cn" target="_blank">系首页</a></p>
      </div>
    </div>
    <div class="title">
      <img src="/img/title.jpg">
      <div class="title-char">
        <p>新闻中心</p>
        <p>News Center</p>
      </div>
    </div>
    <div class="main">
      <div class="fun-list">
        <template v-for="(item, index) in navs">
          <div :id="item.path" @click="navLink(item.path)">
            <div class="fun-select">
              <span class="fun-select-cn">{{ item.title }}</span>
              <span class="fun-select-en">{{ item.en }}</span>
            </div>
          </div>
        </template>
      </div>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer">
      <template v-for="(item, index) in footer">
        <div>
          <h2> {{ item.title }}</h2>
          <ul>
            <template v-for="(litem, lindex) in item.item">
              <li><a :href="litem.link" target="_blank"> {{ litem.title }}</a></li>
            </template>
          </ul>
        </div>
      </template>
    </div>
    <div class="footer ftmsg"><span>©2017 电子科技大学成都学院计算机系</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footer: [],
      navs: []
    }
  },
  mounted() {
    this.$http.get('/idxdata').then(response => {
      this.footer = response.data.footer;
      this.navs = response.data.nav;
    }, response => {
      console.log('err');
    })
  },
  updated() {
    this.routeHook();
  },
  methods: {
    routeHook() {
      let id = this.$route.meta.page;
      if (this.$route.meta.detailView) {
        id = this.$route.params.cate;
      }
      this.$jq('.selected-item').removeClass('selected-item');
      this.$jq('#'+id).addClass('selected-item');
    },
    navLink(target) {
      let url = '/'
      if (target !== 'news') {
        url += target
      }
      this.$router.push(url);
    }
  }
}
</script>