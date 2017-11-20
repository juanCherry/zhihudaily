<template lang="html">
  <div class="contentTopImg">
    <div class="container">
      <img class="topImg" :src="imgUrl(imgSrc)" alt="">
      <p class="titleText">{{ titleText }}</p>
    </div>
  </div>
</template>

<script>
import BUS from '../../assets/js/data'
export default {
  data(){
    return{
      imgSrc:'',  // 存放图片路径
      titleText:'' // 存放文章标题
    }
  },
  methods:{
    // 直接请求接口中的url地址会返回403禁用，该方法通过使用images.weserv.nl进行缓存图片，在需要使用url时进行相应的替换
    imgUrl(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
      }
    }
  },
  created(){
    this.axios.get('api/news/'+this.$route.params.id).then(data=>{
      this.imgSrc = data.data.image
      this.titleText = data.data.title
    })
    // 接收到下一篇文章的图片与标题
    BUS.$on('sendValue', (result) => {
      this.imgSrc = this.imgUrl(String(result));
    })
    BUS.$on('send', (res) => {
      this.titleText = res;
    })
  }

}
</script>

<style lang="css" scoped>
  .topImg{
    width: 100%;
    height: 15.6rem;
  }
  .titleText{
    color: #fff;
    position: absolute;
    bottom: 0;
    z-index: 2;
    font-size: 1.13rem;
    padding: 0.6rem 0.9rem;
    text-align: left;
    line-height: 1.17rem;
  }
  .container{
    /*height: 15.6rem;*/
    position: relative;
  }
  .headline-title,.onlyheading{
    border-bottom: 0.15rem solid #f0f0f0;
    box-shadow: 1px 1px 2px #f0f0f0;
    font-size: 1.35rem;
    color: #000;
    text-align: left;
    padding: 0 1.2rem 1.2rem;
  }
</style>
