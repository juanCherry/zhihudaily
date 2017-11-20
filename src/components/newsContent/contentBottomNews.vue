<template lang="html">
  <div class="loading" v-if="bol">
    <img src="http://img.zcool.cn/community/0152b75824424ca84a0e282be1e705.gif" alt="">
  </div>
  <!-- 新闻详情页底部的内容显示 -->
  <div class="contentBottomNews" v-else>
    <!-- 存放底部所有内容的div。因为json数据包含HTML标签，所以使用v-html解析 -->
    <div v-html="result"></div>
    <!-- 显示详情页底部功能按钮的div -->
    <div class="bottombar">
      <div class="backTo">
        <i class="icon-left iconfont" @click="back()"></i>
      </div>
      <div class="nextNews">
        <i class="icon-bottom iconfont" @click="goNext(index)"></i>
      </div>
      <div class="nice">
        <i class="iconfont icon-zan" @click="like()" :class="likeclass"></i>
        <p>{{ this.likecount }}</p>
      </div>
      <div class="collect">
        <i class="iconfont icon-shoucang" @click="shoucan()" :class="shoucanclass"></i>
      </div>
      <div class="remark" @click="push(Userid)">
        <i class="iconfont icon-pinglun"></i>
        <p>{{this.comments}}</p>
      </div>

    </div>
    <div class="supp">

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.shoucanId = []
Vue.prototype.shouId = 0
Vue.prototype.shouTitle = ''
Vue.prototype.shouImages = ''
Vue.prototype.isShoucan = ''
Vue.prototype.isCollectNews = []
Vue.prototype.nextId = ''
Vue.prototype.Alllikes = ''
import BUS from '../../assets/js/data.js'
import {setCookie, getCookie} from '../../assets/js/cookie.js'
export default {
  data(){
    return{
      result:"",
      // 当前文章的id
      Userid:this.$route.params.id,
      // 当前文章的index
      index:this.$route.params.index,
      data:{},
      // 给一个标识符，看是否点赞了（默认为，是没有点赞）
      isLike:0,
      // 点赞的样式
      likeclass:'',
      // 收藏的样式
      shoucanclass:'',
      // 从数据库中获取的点赞总数量
      likecount:'',
      // 从数据库中获取的评论总数量
      comments:'',
      // 用户是否收藏
      isshoucan:0,
      isshou:this.isBeshoucan,
      bol:true,
      // 下一篇文章的index
      nextIndex:parseInt(this.$route.params.index)+1
    }
  },
  methods:{
    imgReplace: function(body) {
      return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
    },
    back(){
      if(localStorage.getItem(name)==0){
        this.$router.push({
          path:'/home'
        })
      }else if(localStorage.getItem(name)==1){
        this.$router.push({
          path:'/list/cont/'+ 13
        })
      }else if(localStorage.getItem(name)==2){
        this.$router.push({
          path:'/list/cont/'+ 12
        })
      }else if(localStorage.getItem(name)==3){
        this.$router.push({
          path:'/list/cont/'+ 3
        })
      }else if(localStorage.getItem(name)==4){
        this.$router.push({
          path:'/shouCang'
        })
      }else if(localStorage.getItem(name)==5){
        this.$router.push({
          path:'/catagory/allhot'
        })
        localStorage.setItem(name,'1');
      }
    },
    push(item){
      this.$router.push({
        path:'/comment/'+item
      })
    },
    like(){
      if(getCookie('username')==''){
        BUS.$emit("islogin",1);
        setTimeout(()=>{
          BUS.$emit("islogin",0);
          this.$router.push({
            path : '/mine/login'
          })
        },3000)
      }else{
        // 没有点击时
        if(this.isLike == 0&&this.likeclass==''){
          this.isLike = 1;
          this.likeclass = 'userlike';
          this.likecount += 1;
          localStorage.setItem(this.$route.params.id,'like');
        }else{
          // 点击了点赞按钮时
          this.isLike = 0;
          this.likeclass = '';
          this.likecount -= 1;
          localStorage.setItem(this.$route.params.id,'');
        }
      }
    },
    shoucan(){
      if(getCookie('username')==''){
        BUS.$emit("islogin",1);
        setTimeout(()=>{
          BUS.$emit("islogin",0);
          this.$router.push({
            path : '/mine/login'
          })
        },3000)

      }else{
        var _this = this;
        if(this.isshoucan == 0 && this.shoucanclass==''){
          this.isshoucan = 1;
          // 获取到收藏的文章的id和title还有images图片
          this.shouId = this.$route.params.id;
          this.shouTitle = this.$route.params.title;
          this.shouImages = this.$route.params.images;
          // 将收藏的文章信息保存到一个数字中，方便以后的使用
          // this.isCollectNews = JSON.parse(localStorage.getItem('shoucanlierong'))
          this.isCollectNews.push({id:this.shouId,title:this.shouTitle,images:this.shouImages});
          // localStorage.setItem('shoucanlierong',JSON.stringify(this.isCollectNews));
          // 将当前收藏按钮的样式改变
          this.shoucanclass = 'userlike';
          // 将当前样式存入localstorage中，方便标记收藏按钮是否别被点击过
          localStorage.setItem(this.$route.params.title,'userlike');
        }else{
          this.isshoucan = 0;
          // this.isCollectNews = JSON.parse(localStorage.getItem('shoucanlierong'))
          for(var i = 0; i < this.isCollectNews.length;i++){
            if(this.isCollectNews[i].id == this.$route.params.id){
              this.isCollectNews.splice(i,1)
              // localStorage.setItem('shoucanlierong',JSON.stringify(this.isCollectNews));
            }
          }
          // 收藏的样式为空
          this.shoucanclass='';
          localStorage.setItem(this.$route.params.title,'')
        }
      }
     },
    goNext(index){
         // 先获取当前是第几篇文章，是哪个类别的
         if(localStorage.getItem(name)==0){
           // 首页热文部分
           this.axios.get('api/news/latest').then(data=>{
             if(index < data.data.stories.length-1){
              //  先获取到下一篇文章的id，img，title
               var nextId = data.data.stories[index+1].id;
               var nextImages = data.data.stories[index+1].images;
               var nextTitle = data.data.stories[index+1].title;
               this.shoucanclass = localStorage.getItem(nextTitle)
               // 通过兄弟组件传值，将兄弟组件的值传入到IMG的组件中，并展示下一篇文章的标题和图片
               BUS.$emit("sendValue",nextImages);
               BUS.$emit("send",nextTitle);
               this.Userid = nextId;
               this.index = index + 1;
              //  请求下一篇文章的数据
               this.axios.get('api/news/'+nextId).then(res=>{
                 res.data.body = this.imgReplace(res.data.body)
                 this.result = res.data.body
               })
               // 查询评论数和点赞
               this.axios.get('api/story-extra/'+nextId).then(resu=>{
                 this.likecount = resu.data.popularity
                 this.comments = resu.data.comments
               })
               this.likeclass = localStorage.getItem(this.Userid)
             }else{
              // 将此时的文章index传到她的兄弟组件中
               BUS.$emit("last1",1);
               setTimeout(()=>{
                 BUS.$emit("last1",0);
               },2000)
             }
             // 刷新数据
             // window.location.reload();
           })
          //  判断自己点击的是哪一类的文章（理由同上）
         }else if(localStorage.getItem(name)==1){
           this.axios.get('api/theme/13').then(data=>{
             if(index < data.data.stories.length-1){
               var nextId = data.data.stories[index+1].id;
               var nextImages = data.data.stories[index+1].images;
               var nextTitle = data.data.stories[index+1].title;
               this.shoucanclass = localStorage.getItem(nextTitle)
               this.likeclass = localStorage.getItem(this.Userid)
               BUS.$emit("sendValue",nextImages);
               BUS.$emit("send",nextTitle);
               this.Userid = nextId;
               this.index = index + 1;
               this.axios.get('api/news/'+nextId).then(res=>{
                 res.data.body = this.imgReplace(res.data.body)
                 this.result = res.data.body
               })
               this.axios.get('api/story-extra/'+nextId).then(resu=>{
                 this.likecount = resu.data.popularity
                 this.comments = resu.data.comments
               })
             }
           })
         }else if(localStorage.getItem(name)==2){
           this.axios.get('api/theme/12').then(data=>{
             if(index < data.data.stories.length){
               var nextId = data.data.stories[index+1].id;
               var nextImages = data.data.stories[index+1].images;
               var nextTitle = data.data.stories[index+1].title;
               this.shoucanclass = localStorage.getItem(nextTitle)
               this.likeclass = localStorage.getItem(this.Userid)
               BUS.$emit("sendValue",nextImages);
               BUS.$emit("send",nextTitle);
               this.Userid = nextId;
               this.index = index + 1;
               this.axios.get('api/news/'+nextId).then(res=>{
                 res.data.body = this.imgReplace(res.data.body)
                 this.result = res.data.body
               })
               this.axios.get('api/story-extra/'+nextId).then(resu=>{
                 this.likecount = resu.data.popularity
                 this.comments = resu.data.comments
               })
             }
           })
         }else if(localStorage.getItem(name)==3){
           this.axios.get('api/theme/3').then(data=>{
             if(index < data.data.stories.length){
               var nextId = data.data.stories[index+1].id;
               var nextImages = data.data.stories[index+1].images;
               var nextTitle = data.data.stories[index+1].title;
               this.shoucanclass = localStorage.getItem(nextTitle)
               this.likeclass = localStorage.getItem(this.Userid)
               BUS.$emit("sendValue",nextImages);
               BUS.$emit("send",nextTitle);
               this.Userid = nextId;
               this.index = index + 1;
                 this.axios.get('api/news/'+nextId).then(res=>{
                   res.data.body = this.imgReplace(res.data.body)
                   this.result = res.data.body
                 })
                 this.axios.get('api/story-extra/'+nextId).then(resu=>{
                   this.likecount = resu.data.popularity
                   this.comments = resu.data.comments
                 })
             }else{
             }
           })
         }else if(localStorage.getItem(name)==5){
           this.axios.get('api/news/hot').then(data=>{
             if(index < data.data.recent.length){
               var nextId = data.data.recent[index+1].news_id;
               var nextImages = data.data.recent[index+1].thumbnail;
               var nextTitle = data.data.recent[index+1].title;
               this.shoucanclass = localStorage.getItem(nextTitle)
               this.likeclass = localStorage.getItem(this.Userid)
               BUS.$emit("sendValue",nextImages);
               BUS.$emit("send",nextTitle);
               this.Userid = nextId;
               this.index = index + 1;
                 this.axios.get('api/news/'+nextId).then(res=>{
                   res.data.body = this.imgReplace(res.data.body)
                   this.result = res.data.body
                 })
                 this.axios.get('api/story-extra/'+nextId).then(resu=>{
                   this.likecount = resu.data.popularity
                   this.comments = resu.data.comments
                 })
             }else{
             }
           })
         }
     }
  },
  created(){
    this.axios.get('api/news/'+ this.$route.params.id).then(data=>{
      data.data.body = this.imgReplace(data.data.body)
      this.result = data.data.body
    })
    this.axios.get('api/story-extra/'+ this.$route.params.id).then(data=>{
      this.likecount = data.data.popularity;
      this.comments = data.data.comments;
      if(getCookie('username')==''){
      }else{
        if(localStorage.getItem(this.$route.params.id)=="like"){
            this.likeclass = "like";
            this.likecount = this.likecount+1;
        }
        else{
              this.likeclass = "";
        }
      }
    })
    if(getCookie('username')==''){
    }else{
      if(localStorage.getItem(this.$route.params.title)=="userlike"){
            this.shoucanclass = "userlike";
      }
      else{
            this.shoucanclass = "";
      }
    }

    this.axios.get('api/news/latest').then(data=>{
      this.data = data.data.stories;
      this.bol = false
    })

  }
}
</script>

<style lang="css">
.supp{
  height: 3.5rem;
  width: 100%;
}
  a{
    text-decoration: none;
    color: #4786b3;
  }
  .question{
    padding: 0 1.2rem;
    text-align: left;
  }
  .question-title{
    font-size: 1.13rem;
    margin: 1.45rem 0;
  }
  .avatar{
    width: 1.25rem;
    vertical-align: top;
    margin-right: 0.6rem;
    float: left;
  }
  .author{
    font-weight: bold;
    float: left;
    margin-top: 0.1rem;
  }
  .content{
    clear: both;
    color: #616466;
    padding-top: 1.5rem;
    font-size: 1.05rem;
    line-height: 1.6rem;
  }
  .content>p{
    margin: 1.5rem 0;

  }
  .content-image{
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .content ul{
    padding-left: 1.25rem;
    list-style: none;
  }
  .view-more{
    background-color: #f0f0f0;
    padding: 0.3rem 0;
    text-align: center;
    margin-bottom: 0.4rem;
  }
  .view-more a{
    color: #aaa;
  }
  .content>img{
    width: 100%;
  }
  ol{
    list-style: none;
    padding-left: 1.2rem;
  }
  blockquote{
    padding-left: 1.2rem;
    color: #9da3a6;
    border-left: 0.18rem solid #dfe3e6;
  }
  blockquote strong{
    line-height: 1.7rem;
  }
  .video-box{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bottombar{
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #f0f0f0;
    padding-top: 0.3rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .bottombar i{
    font-size: 1.7rem;
  }
  .nextNews{
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  .remark{
    font-weight: bold;
  }
  .bottombar>div{
    position: relative;
    width:1.7rem;
    height: 1.8125rem;
  }
  .nice>p,.remark>p{
    position: absolute;
    top: -0.4rem;
    left:1.4rem;
    font-size: 0.9rem;
  }
  .headline-background{
    padding: 1rem 0.8rem;
    border-bottom: 0.15rem solid #f0f0f0;
    box-shadow: 1px 1px 2px #f0f0f0;
    text-align: left;
    line-height: 1.5rem;
  }
  .headline-background .heading{
    color:#999;
    font-size: 0.9rem;
  }
  .headline-background .heading-content{
    color: #333;
  }
  .meta{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bio{
    color: #999;
  }
  /*.loading{
    position: fixed;
    top: 18rem;
    left: 36%;
  }*/
  .loading{
    position: fixed;
    top: 18rem;
    left: 36%;
  }
  .loading img {
    width: 20rem;;
  }

  .userlike{
    color: blue;
  }
  .like{
    color:blue;
  }
</style>
