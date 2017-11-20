<template lang="html">
  <div class="">
    <div class="tabbar">
        <div class="nav">
            <router-link  to='/home' >首页</router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouye"></use>
            </svg>
          </div>
          <div class="nav" @click="push()">
            <router-link  to='/list' @click.native="make3()">分类</router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenlei"></use>
            </svg>
          </div>
          <div class="nav">
            <router-link  to='/shouCang' @click.native="make4()">收藏</router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-favorite"></use>
            </svg>
          </div>
          <div class="nav">
            <router-link  to='/mine'>我的</router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-account"></use>
            </svg>
          </div>
      </div>
  </div>


</template>

<script scoped>
export default {
  methods: {
    push(){
      this.$router.push('/list/cont/13');
    },
    make3(){
      localStorage.setItem(name,"1");
    },
    make4(){
      localStorage.setItem(name,"4");
    }
  }
}
</script>
