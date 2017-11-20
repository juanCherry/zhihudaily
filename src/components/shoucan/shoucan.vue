<template lang="html">
    <div class="collectNewList">
      <div v-if="have" class="have">
        <span>还没有任何收藏文章</span>
      </div>
      <div v-else>
        <ul>
          <!-- 从自己的数据中查询出文章id，title， -->
          <li v-for="(story,index) in this.isCollectNews" @click="push(story.id,story.title,story.images)" class="stories">
            <span>{{story.title}}</span>
            <img v-if="story.images[0]" v-lazy="attachImageUrl(story.images[0])"/>
            <span class="span2" v-else>
                <img v-lazy="attachImageUrl(story.images[0])">
            </span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {setCookie, getCookie} from '../../assets/js/cookie.js'
export default {
  data(){
    return {
      have:'',
      allShoucan:[]
    }
  },
  created(){
    if(getCookie('username')==''){
      this.have = true
    }else{
      // 点击收藏时，获取到手藏的文章内容，并将其显示在收藏页面
      // this.isCollectNews = JSON.parse(localStorage.getItem('shoucanlierong'));
      if(this.isCollectNews == null){
        this.have = true
      }else if(this.isCollectNews <= 0){
        this.have = true
      }else{
        this.have = false
      }
    }
  },
  methods:{
    // 点击收藏时需要
      push(id,title,images){
        this.$router.push({
          path:'/api/news/',
          name:'NewsContent',
          params:{
            id:id,
            title:title,
            images:images
          }
        })
    },
      attachImageUrl: function(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(
            /http\w{0,1}:\/\/p/g,
            "https://images.weserv.nl/?url=p"
          )
        }
      }
    }
}
</script>

<style lang="css">
.have{
  font-size: 1.2rem;
  position: absolute;
  top:18rem;
  left:28%;
  opacity: 0.3;
}
.collectNewList{
  height: 30rem;
}
.stories{
    text-align: left;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    border-bottom: 1px solid lightcyan;
    display: flex;
    justify-content: space-between;
    overflow: scroll;
}
.stories>span{
    display: inline-block;
    height: 3rem;
    white-space: pre-wrap;
    margin-bottom: 1rem;
}
.stories>span:nth-of-type(1){
    margin-top: 1.2rem;
}
.stories>img{
  width: 4.5rem;
  height: 3.3rem;
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
