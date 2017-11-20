<template lang="html">
  <div class="newsContent">
    <head>

    </head>
    <!-- 社会化分享代码 -->
    <div class="share">
      <div class="jiathis_style_32x32">
         <a class="jiathis_button_qzone"></a>
         <a class="jiathis_button_tsina"></a>
         <a class="jiathis_button_tqq"></a>
         <a class="jiathis_button_weixin"></a>
         <a class="jiathis_button_renren"></a>
         <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>
         <a class="jiathis_counter_style"></a>
     </div>

    </div>
      <ContentTopImg></ContentTopImg>
      <ContentBottomNews></ContentBottomNews>
      <div :class="this.hotNews" id="hot">
        已经没有热门新闻啦
      </div>
      <div :class="this.islogin" id="loginTag">
        还没有登录，请登录
      </div>
  </div>
</template>

<script>
import BUS from '../../assets/js/data'
// 导入文章详情页顶部的组件
import ContentTopImg from './contentTopImg'
// 导入文章详情页底部的组件
import ContentBottomNews from './contentBottomNews'
export default {
  data(){
    return{
      hotNews:'hotnone',
      last:'',
      islogin:'loginnone'
    }
  },
  mounted () {
      this.init()
  },
  methods: {
      init: function () {
        let url = 'http://v3.jiathis.com/code/jia.js'
        let script = document.createElement('script')
        script.setAttribute('src', url)
        document.getElementsByTagName('head')[0].appendChild(script)
      }
  },
  components:{
    ContentTopImg,
    ContentBottomNews
  },
  created(){
    BUS.$on('last1', (res) => {
      if(res==1){
        this.hotNews = 'hotshow'
      }else{
        this.hotNews = 'hotnone'
      }

    })
    BUS.$on('islogin', (resu) => {
      if(resu==1){
        this.islogin = 'loginshow'
      }else{
        this.islogin = 'loginnone'
      }
    })
  }
}
</script>

<style lang="css" scoped>
.share{
  position: fixed;
  top: 0;
  z-index: 500;
  left:12%;
}
  .newsContent{
    height: 100%;
  }
  #hot,#loginTag{
    background-color: black;
    opacity:0.5;
    font-size: 1rem;
    width:45%;
    position: absolute;
    bottom: 3.8rem;
    left:28%;
    color: white;
    position: fixed;
    padding: 0.5rem;
    bottom: 4rem;
  }
  .hotnone{
    display: none;
  }
  .hotshow{
    display: block;
  }
  .loginnone{
    display: none;
  }
  .loginshow{
    display: black;
  }
</style>
