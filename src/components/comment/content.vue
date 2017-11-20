<template lang="html">
  <div class="contentCount">
    <!-- 评论人头像 -->
    <img v-lazy="photoUrl" class="photo"/>
    <div class="content">
      <!-- 评论人用户名 -->
      <span class="commenter">{{ commenter }}</span>

      <!-- 该评论获取的点赞数 -->
      <span class="niceCount">
        <!-- 点赞的图像 -->
        <i class="iconfont icon-dianzan" @click.stop="isLike()" :class="isSurelike"></i>
        {{ this.likeCount }}
      </span>

      <div class="">
        <!-- 评论内容 -->
        <span class="contentText">{{ contentText }}</span>
      </div>
    </div>

  </div>

</template>

<script>
import Vue from 'vue'
import {setCookie, getCookie} from '../../assets/js/cookie.js'
import BUS from '../../assets/js/data'
export default {
  props:['photoUrl','commenter','nice','contentText','conid'],
  data(){
    return {
      isSurelike:'',
      likeCount:''
    }
  },
  methods:{
    isLike(){
      // 判断是否是登录状态，再进行操作
      if(getCookie('username')==''){
        // 没有登录时点击会进入登录页面
        BUS.$emit("islogin",1);
        setTimeout(()=>{
          BUS.$emit("islogin",0);
          this.$router.push({
            path : '/mine/login'
          })
        },3000)
      }else{
        // 点赞或未点赞后的图标样式
        if(this.isSurelike==''){
          this.isSurelike = 'like';
          this.likeCount = this.nice + 1;
          localStorage.setItem(this.conid,'like');
        }else{
          this.isSurelike = '',
          localStorage.setItem(this.conid,'');
          this.likeCount = this.nice;
        }
      }
    }
  },
  created(){
    // 获取localstorage中存储的数据
    if(localStorage.getItem(this.conid)=='like'){
      this.likeCount = this.nice + 1;
      this.isSurelike = 'like';
    }else{
      this.likeCount = this.nice;
      this.isSurelike = '';
    }
  }
}
</script>

<style lang="css">
  .contentCount{
    width:94%;
    padding: 0.625rem 0.625rem 0 0.625rem;
    /*text-align: center;*/
    border-bottom: 1px solid #EDEDED;
    position: relative;
  }
  .photo{
    border-radius: 50%;
    position: absolute;
    left:0.625rem;
    right:0;
    border: 0;
    width:1.873rem;
    height: 1.873rem;
  }
  .contentCount>.content{
    font-size: 1.0625rem;
    line-height: 1.6rem;
    color: #616466;
    position: relative;
    left: 2.5rem;
    right: 0;
    top: -0.625rem;
    width:19.5rem;
  }
  .contentCount>.content>.commenter{
    left:0.3125rem;
    line-height: 1.875rem;
  }
  .iconfont{
    position: absolute;
    width:1.25rem;
    height: 1.25rem;
    right: 0.7rem;
  }
  .contentCount>.content>.niceCount{
    position: absolute;
    right: 0.7rem;
    top:0.15rem;
  }
  .like{
    color: #028fd6;
  }
</style>
