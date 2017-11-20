<template>
    <div class="home">
          <Weather/>
          <TOP-text :topText="text"></TOP-text>
          <Top></Top>
          <Swiper></Swiper>
          <List-content></List-content>
          <Index-nav></Index-nav>
          <img src='../assets/1.png' @click="push()">
    </div>

</template>
<script>
import Weather from '../components/weather/weather'
import Swiper from '../components/swiper/swiper'
import ListContent from '../components/listContent/listContent'
import Top from '../components/header/top'
import TOPText from '../components/header/topText'

// 导入导航模块
import IndexNav from '../components/indexNav/indexNav'
export default {

  components:{
      Swiper,
      ListContent,
      Top,
      TOPText,
      IndexNav,
      Weather
  },
  methods:{
      push() {
      this.$router.push("/home/biaoji");
      }
  },
  data(){
    return{
      text:'今日热闻'
    }
  }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.home{
    padding: 0;
}
.home>img{
    position: absolute;
    top: 0.3rem;
    right: 0.8rem;
    width: 1.8rem;
    height: 1.8rem;
}
</style>
