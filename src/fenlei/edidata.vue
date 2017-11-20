<template>
    <div class="zhubiaodata">
        <div class="lastnav">
            <span @click="edidaGo()">〈</span>
            <span>{{item.name}}</span>
        </div>
        <div class="bc"></div>
        <div class="edidaLi">
            <img :src="attachImageUrl(item.avatar)">
            <p>{{item.name}}</p>
            <p>{{item.bio}}</p>
        </div>
        <div class="phone">
            <li>知乎账号</li>
            <li>新浪微博</li>
            <li>个人网站</li>
            <li>电子邮箱</li>
        </div>
    </div>
</template>

<script>
export default {
  data(){
      return{
          item:{}
      }
  },
  methods:{
    attachImageUrl: function(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\/p/g,
          "https://images.weserv.nl/?url=p"
        )
      }
    },
    edidaGo(){
      // 回到之前对应的作者列表展示页面
        this.$router.push('/editors/'+ this.$route.params.id)
    }
  },
  created(){
      this.item = this.$route.params.item;
  }
}
</script>

<style scoped>
.lastnav{
    background-color: #028fd6;
    width: 100%;
    height: 2.3rem;
    line-height: 2.3rem;
    color: white;
}
.lastnav>span:nth-of-type(1){
    float: left;
    display: inline-block;
    width: 5rem;
    text-align: left;
}
.lastnav>span:nth-of-type(2){
    margin-left: -5rem;
}
.bc{
    width: 100%;
    height: 7rem;
    background: transparent url(http://news-at.zhihu.com/img/editor_profile/Editor_Profile_Avatar_Bg@2x.png) 50% 0;
}
.edidaLi{
    list-style: none;
    position: relative;
    border-bottom: 1px solid lightcyan;
    height: 7rem;
}
.edidaLi>img{
    display: inline-block;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    margin-top: -2.3rem;
}
.edidaLi>p:nth-of-type(2){
    font-size: 0.85rem;
    color: #999;
    margin-top: 0.5rem;
}
.phone>li{
    list-style: none;
    height: 4rem;
    line-height: 4rem;
    text-align: left;
    padding-left: 2rem;
    color: #999;
    border-bottom: 1px solid lightcyan;
}
</style>
