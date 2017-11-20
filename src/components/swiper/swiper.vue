<template>
    <div>
      <!-- <div v-if="bol" id="loading">
        <img src="http://img.zcool.cn/community/0152b75824424ca84a0e282be1e705.gif" alt="">
      </div> -->
        <div class="swiper">
          <!-- vue-awesome-swiper组件 -->
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in data" :key="index">
                    <img :src="attachImageUrl(item.image)" @click="push(item.id,item.title,item.images,index)">
                    <h3 @click="push(item.id,item.title,item.images,index)">{{item.title}}</h3>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
// 导入vue-awesome-swiper所需要的组件
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    // vue-awesome-swiper相关配置选项
    return {
      swiperOption: {
        autoplay: 3000,
        direction: "horizontal",
        pagination: ".swiper-pagination",
        // 用户触发滑动图片后，使图片还能够继续自动播放所需要的参数
        autoplayDisableOnInteraction: false
      },
      data: [],
      bol: true
    };
  },
  components: { swiper, swiperSlide },
  created() {
    // 获取接口数据
      this.axios.get("api/news/latest").then(data => {
      this.bol = false;
      this.data = data.data.top_stories;

    });
  },
  methods: {
    attachImageUrl: function(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\/p/g,
          "https://images.weserv.nl/?url=p"
        );
      }
    },
    // 跳转页面所需要传递过去的值，以及完成页面跳转
    push(id,title,images,index){
      // console.log(id);
        this.$router.push({
          path:'/api/news/',
          name:'NewsContent',
          params:{
            id:id,
            title:title,
            images:images,
            index:index
          }
        })
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.swiper {
  height: 13rem;
  /* width: 100%;
   */
   overflow: hidden;
}
.swiper img {
  width: 100%;
  /* float: left; */
  height: 13rem;
  z-index: 1;
}
.swiper-slide {
  position: relative;
}
.swiper h3 {
  position: absolute;
  /* margin: 0 auto; */
  left: 0.6rem;
  font-weight: 500;
  font-size: 1.2rem;
  top: 9rem;
  z-index: 5;
  color: white;
  bottom: 10px;

  text-align: left;
}
.swiper-wrapper {
  overflow: hidden;
  height: 13rem;
  width: 500%;
}
.swiper-wrapper > div {
  float: left;
}
.swiper-container {
  position: relative;
}
.swiper-pagination{
    position: absolute;
    width: 100%;
    bottom: 0.4rem;
}
.swiper-pagination>span{
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    background-color: gray;
    z-index:20;
    margin: 0 0.5rem;
    border-radius: 50%;
}
.swiper-pagination-bullet-active{
     background-color: rgba(0, 0, 0, .5) !important;
}
#loading {
  position: absolute;
  top: 20rem;
  left: 0;
  width: 50rem;
  height: 100%;
}
#loading img {
   width: 12rem;
   margin-left: -30rem;
}
</style>
