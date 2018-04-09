<template>
	<div id="main-content" class="main-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="news" v-for="(item, index) in listData">
      <div class="news-time">
      	<span class="news-date">{{ getTime('day', item.ctime) }}</span>
      	<span class="new-year">{{ getTime('ym', item.ctime) }}</span>
      </div>
	    <div class="detail-link" @click="detLink(item._id)">
	      <p class="news-title">{{ $route.meta.page }}://{{item.title}}</p>
	      <p class="news-summary">{{ item.abstract.substring(0, 74)+'...' }}</p>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      busy: false
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeHook'
  },
  methods: {
    routeHook() {
      this.fetchList(1);
    },
    detLink(id) {
    	this.$router.push('/detail/'+this.$route.meta.page+'/'+id);
    },
    loadMore() {
      this.busy = true;
      this.page++;
      this.fetchList(this.page);
    },
    fetchList(page) {
      if (page === 1) {
        this.listData = [];
      }
      this.$http.get('/list/'+this.$route.meta.page+'/'+page).then(response => {
      	for (var i = 0; i <= response.data.length - 1; i++) {
      		this.listData.push(response.data[i]);
      	}
      }, response => {
        console.log('err');
      })
    },
    getTime(cate, dateStr) {
      let d = new Date(dateStr);
      if (cate === 'day') {
        return d.getDate();
      }
      else {
        return d.getFullYear()+'.'+d.getMonth();
      }
    }
  }
}
</script>