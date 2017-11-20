<template>
  <div v-if="startopen" class="startopen">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510927034274&di=060bea7e3ff27a5e7bbeea1b0a728060&imgtype=0&src=http%3A%2F%2Fwww.mgyapp.com%2FFiles%2FVol1%2FAppPhoto%2F2012%2F12%2F19%2F3b221205-8f61-4c2f-ad16-643d637d8b2d.png" alt="">
  </div>
  <div v-else>
    <div class="">
      <div id="app2" v-if='nightFlag'  :class="bigFont">
          <router-view></router-view>
      </div>
      <div id="app" v-else :class="bigFont">
          <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      // nightFlag : '',
      startopen:true
    };
  },
  created () {
  this.$router.push("/home")
  },
  beforeCreate(){
    setTimeout(()=>{
      this.startopen = false
    },3000)
  },
  computed : {
     nightFlag() {
       return this.$store.getters.getNightFlag;
     },
     bigFont() {
       return this.$store.getters.getFontSize;
     }
  }
};
</script>

<style>
.startopen>img{
  height: 42.5rem;
}
#app, #app2, .bigFont{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 100;
}
.bigFont {
  font-size: 22px;
}
.bigFont .swiper h3 {
  font-size: 1.4rem;
}
.bigFont .home ul li {
  height: 4.5rem;
}
.bigFont .stories {
  height: 8rem;
}
.bigFont .home ul li .span1 {
  line-height: 1.8rem;
}
.bigFont p {
  font-size: 1.4rem;
  line-height: 1.6rem;
}
.bigFont .list .ul a {
  font-size: 1.2rem;
}
.bigFont .zhubiao .ediLi .editorName {
   font-size:1.5rem;
}
.bigFont .mineWrap .wrap span {
   font-size: 1.5rem;
}
.bigFont .mineWrap .night {
  height: 1rem;
}
.bigFont .mineWrap .small {
   height: 1rem;
}
.bigFont .mineWrap .night span, .bigFont .mineWrap .font span {
  height: 1.2rem;
}
#app2 {
  height: 41.6rem;
  background: #080C10;
}
#app2 .router-link-active {
  background-color: gray;
  opacity: 0.2
}
#app2 .top {
  background-color: lightgray;
  opacity: 0.2
}
#app2 .ul>a {
  background:#080C10;
}
#app2 div {
  background: #080C10;
  /*background: #999;*/
  color: #424952;
  /*opacity: 0.8;*/
}
#app2 .loading {
  background: transparent;
}
#app2 span a {
  color: skyblue;
  opacity: 0.5;
}
#app2 h3 {
  color: #424952;
}
#app2 .topText span {
  color: #424952;
}
#app2 p {
  color: #424952;
}
#app2 .back {
   color: lightgray;
}
#app2 input {
  background: lightgray;
}
#app2 .zhubiao, #app2 .zhubiaodata {
   background: #080C10;
   height: 41.5rem;
   width: 100%;
}
#app2 .weather span {
  color: lightgray;
}
#app2 .weather{
  border-color: darkgray;
  box-shadow: 0 0 1px 1px lightgray;
}
#app2 .swiper-pagination {
  opacity: 0.5;
}
#app2 .showinfo {
  height: 41.5rem;
}
#app2 .el-vue-amap {
  background: #fafafa;
}
#app2 .amap-info div {
  background: lightblue;
}
#app2 .amap-info-outer {
  background: lightblue;
}
#app2 .amap-info-sharp {
  background: lightblue;
}
#app2 .amap-geo, #app2 .amap-copyright,#app2 #go{
  background: lightblue;
}
#app2 .search .realSearch, #app2 .search .realSearch input {
  background: #fafafa;
}
#app2 .search .realSearch input {
   border-right: 1px solid  #080C10;
}
* {
  margin: 0;
  padding: 0;
}
.tabbar {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  bottom: -0.24rem;
  z-index: 10;
}
.tabbar > div {
  width: 100%;
  height: 3.5rem;
  line-height: 5rem;
  background-color: #028fd6;
  /* border: 1px solid black; */
}
.tabbar a {
  display: block;
  width: 100%;
  height: 4rem;
  text-decoration: none;
  color: white;
}
.router-link-active {
  background-color: #23aaff;
}
.nav {
  position: relative;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  position: absolute;
  top: 0.3rem;
  left: 42%;
  width: 1.2rem;
  height: 1.3rem;
  color: white;
}
</style>
