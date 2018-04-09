<template>
	<div id="main-details" class="main-details">
    <span class="return" @click="backpage">
      <i class="fa fa-chevron-left" aria-hidden="true"></i> 返回
    </span>
    <div class="detail-top">
      <h2>{{ content.title }}</h2>
      <p>{{ content.ctime }}</p>
    </div>
    <div class="detail-content">
      <p>{{ content.abstract }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: {}
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeHook'
  },
  mounted() {
    this.routeHook();
  },
  methods: {
    routeHook() {
      this.$http.get('/detail/'+this.$route.params.cate+'/'+this.$route.params.id).then(response => {
        this.content = response.data[0];
      }, response => {
        console.log('err');
      })
    },
    backpage() {
      this.$router.go(-1);
    }
  }
}
</script>