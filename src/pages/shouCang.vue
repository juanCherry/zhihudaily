<template>
  <div>
    <Index-nav></Index-nav>
    <TopText :topText="topText"></TopText>
    <Top></Top>
    <Shoucan></Shoucan>
  </div>
</template>
<script>
import IndexNav from '../components/indexNav/indexNav'
import Top from '../components/header/top'
import TopText from '../components/header/topText'
import Shoucan from "../components/shoucan/shoucan"
export default {
  data(){
    return {
      topText:'我的收藏',
      likeId:'$route.params.likeArr'
    }
  },
  components:{
    TopText,
    Top,
    IndexNav,
    Shoucan
  }
}
</script>
<style scoped>

</style>
