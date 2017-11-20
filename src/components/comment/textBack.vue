<template>
  <div class="topText">
      <!-- 头部按钮，以及返回时，触发的函数，返回到哪个页面（在收藏的页面也会用到这个组件） -->
      <i class="iconfont icon-fanhui" id="textback" @click="callBack()"></i>
      <span class="topText" id="topText">{{ text }}{{ text1 }}</span>
  </div>
</template>
<script>
export default {
  props:['text','text1','id'],
  methods:{
    callBack(){
      // 直接修改点击跳转时的路由，让页面跳回原来的页面，并将这篇文章的id传到下一个组件中去
      this.$router.push({
        path:'/api/news/',
        name:'NewsContent',
        params:{
          id:this.id
        }
      })
    }
  }
}
</script>
<style>
.topText{
    height: 0rem;
    text-align: center;
}
.topText>span{
    line-height: 2.5rem;
    font-size: 1.4rem;
    font-weight: 300;
    color: white;
}
#textback{
  color: white;
  font-size: 1.6rem;
  position: absolute;
  top: 0.3rem;
  left:0.1rem;
}
.topText{
  text-align: center;
  color: white;
}
#topText{
  font-size: 1.3rem;
}
</style>
