<template lang="html">
    <div class="load" v-if="bol">
      <img src="http://img.zcool.cn/community/0152b75824424ca84a0e282be1e705.gif" alt="">
    </div>
    <div class="comment" v-else>
        <div class="">
          <TextBack :text="comAll.comments" :text1="text1" :id="userid"></TextBack>
          <Top></Top>
        </div>
        <div class="usercontent">
          <p @click="writeContent()">点击发表评论</p>
          <div class="contentTag" v-show="contentflag">
            <Evaluate></Evaluate>
          </div>
        </div>

        <!-- 长评论 -->
        <div class="longComment">
            <div @click="change1()">
                <Cominfo :comment="comAll.long_comments" :type="type[0]" :url="url[isChange1]"></Cominfo>
            </div>
            <div class="longlong" v-html="this.addlong">

            </div>
            <div v-for="(item,index) in long" v-show="longflag">
                <!-- 图片不能通过跨域直接访问到，需要通过函数方法来将图片地址改为不受限制的路径 -->
                <Contents :photoUrl="replace(item.avatar)" :commenter="item.author" :nice="item.likes" :contentText="item.content" :conid="item.id"></Contents>
            </div>
        </div>
        <!-- 短评论 -->
        <div class="shortComment">
          <div @click="change2()">
              <Cominfo :comment="comAll.short_comments" :type="type[1]" :url="url[isChange2]"></Cominfo>
          </div>
          <div class="shortshort" v-html="this.addshort">

          </div>
          <div v-for="(item,index) in short" v-show="shortflag">
              <Contents :photoUrl="replace(item.avatar)" :commenter="item.author" :nice="item.likes" :contentText="item.content" :conid="item.id"></Contents>
          </div>
        </div>

        <div :class="this.islogin" id="logintag">
          还没有登录，请登录
        </div>
    </div>
</template>

<script>
import Cominfo from './cominfo'
import Contents from './content'
import Evaluate from './evaluate'
import Top from '../header/top'
import TextBack from './textBack'
import Vue from 'vue'
import BUS from '../../assets/js/data'
export default {
  data(){
    return {
      comAll:{},
      long:{},
      short:{},
      type:['长','短'],
      // 此时表示的是没有点击
      isChange1:1,
      isChange2:1,
      longflag:true,
      shortflag:true,
      contentflag:false,
      url:['http://www.easyicon.net/api/resizeApi.php?id=1182590&size=32',
           'http://www.easyicon.net/api/resizeApi.php?id=1182484&size=32'
         ],
      bol:true,
      up:0,
      down:1,
      text1:'条点评',
      isOpenContent:'noOpen',
      userid : this.$route.params.userid,
      addlong:'',
      addshort:'',
      islogin:'loginnone'
    }
  },
  methods:{
    replace(photoUrl){
      // 路径不为空时，执行修改路径的操作
      if(photoUrl != 'undefinded'){
        // 知乎的图片防盗链,知乎的图片可能会通过请求头的referer参数判断，如果不是指定的域名会返回403.所以需要通过一个过滤器来将知乎的url替代为图片代理网站的url
        return photoUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
      }
    },
    change1(){
      if(this.longflag == true){
        this.longflag = false;
        this.isChange1 = 0;
      }else{
        this.longflag = true;
        this.isChange1 = 1;
      }
    },
    change2(){
      if(this.shortflag == true){
        this.shortflag = false;
        this.isChange2 = 0;
      }else{
        this.shortflag = true;
        this.isChange2 = 1;
      }
    },
    writeContent(){
      if(this.contentflag == false){
        this.contentflag = true;
      }else{
        this.contentflag = false;
      }
    }
  },
  created(){
    BUS.$on('sendlongInf', (result) => {
      if(result != ''){
        this.comAll.long_comments = this.comAll.long_comments + 1;
        this.comAll.comments = this.comAll.comments + 1;
        this.addlong = result;
      }
    })
    BUS.$on('sendshortInf', (res) => {
      if(res != ''){
        this.comAll.short_comments = this.comAll.short_comments + 1;
        this.comAll.comments = this.comAll.comments + 1;
        this.addshort = res;
      }
    })
    BUS.$on('islogin', (resu) => {
      if(resu==1){
        this.islogin = 'loginshow'
      }else{
        this.islogin = 'loginnone'
      }
    })
  },
  mounted(){
    // 这里的参数是文章的id值(作用的获取到是文章的评论数（总评论，长评论，短评论）)
    this.axios.get('api/story-extra/'+this.userid).then(data=>{
        this.comAll = data.data;
        //总评论
        this.count = data.data.comments;
        // 长评论
        this.longCom = data.data.long_comments;
        // 短评论
        this.shortCom = data.data.short_comments;
        // 点赞总数
        this.popularity = data.data.popularity;
      }),
    // 中间的id替换成自己点击进去的文章id(作用是获取到长评论的作者，评论内容，评论时间，评论作者的id，评论获取到的赞，用户头像图片)
    this.axios.get('api/story/'+this.userid+'/long-comments').then(data=>{
        this.long = data.data.comments;
        this.NewLong = this.long;
    }),
    // 中间的id替换成自己点击进去的文章id(作用是获取到短评论的作者，评论内容，评论时间，评论作者的id，评论获取到的赞，用户头像图片)
    this.axios.get('api/story/'+this.userid+'/short-comments').then(data=>{
        this.short = data.data.comments;
        return this.bol = false;
    })
  },
  components:{
    Cominfo,
    Contents,
    Evaluate,
    Top,
    TextBack
  }
}
</script>

<style lang="css">
.loginnone{
  display: none;
}
.loginshow{
  display: black;
}
#logintag{
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
  .usercontent>p{
    width:100%;
    height: 2.5rem;
    border-bottom: 1px solid #EDEDED;
    font-weight:700;
    padding-left: 0.625rem;
    line-height: 2.5rem;
    font-weight: 700;
  }
  .load{
    text-align: center;
  }
  .load>img{
    margin-top: 12rem;
    width: 20rem;;
  }
  .noOpen{
    display: none;
  }
  .Open{
    display: block;
  }
  .longComment{
    text-align: left
  }
  .shortComment{
    text-align: left
  }
  .usercontent{
    text-align: left
  }
</style>
