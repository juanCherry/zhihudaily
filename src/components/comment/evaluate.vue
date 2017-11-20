<template lang="html">
  <!-- 评论框的样式 -->
    <div class="ContentTag">
      <textarea type="text" v-model="msg" name="" class="evaluateText"/>
      <button type="button" name="button" class="submit" @click="changeText()">提交</button>
    </div>
</template>

<script>
import BUS from '../../assets/js/data'
import {setCookie, getCookie} from '../../assets/js/cookie.js'
export default {
  data(){
    return {
      commentText:'',
      msg:'',
      sureText:'',
      username:'',
      userphoto:''
    }
  },
  methods:{
    changeText(){
      if(getCookie('name')==''){
        BUS.$emit("islogin",1);
        setTimeout(()=>{
          BUS.$emit("islogin",0);
          this.$router.push({
            path : '/mine/login'
          })
        },3000)
      }else{
        if(this.sureText == ''){
          console.log('还没有输入数据');
        }else{
          this.username = getCookie('username');
          this.userphoto = getCookie('userphoto');
          // 将书写的评论拼接进评论区域
          var useralltext = '<div class="contentCount"><img v-lazy="'+this.userphoto+'" class="photo"/><div class="content"><span class="commenter">'+this.username+'</span><span class="niceCount"><i class="iconfont icon-dianzan" @click.stop="isLike()" :class="isSurelike"></i>'+0+'</span><div class=""><span class="contentText">'+this.sureText+'</span></div></div></div>'
          if(this.sureText.length > 50){
            // 长评论
            BUS.$emit("sendlongInf",useralltext);
            this.msg = ''
          }else{
            //短评论
            BUS.$emit("sendshortInf",useralltext);
            this.msg = ''
          }
        }
      }
    }
  },
  watch:{
    msg(newValue,oldValue){
      // 监听输入框里面的值
      this.sureText = newValue;
    }
  }
}
</script>

<style lang="css">
    .ContentTag{
      text-align: center;
      border-bottom: 1px solid #EDEDED;
    }
    .evaluateText{
      border: 1px solid #EDEDED;
      border-top: 0;
      width:99%;
      height:4rem;
      overflow: hidden;
      outline:none;
    }
    .submit{
      background-color: #028fd6;
      color: white;
      margin-left: 20rem;
      display: inline-block;
      height: 1.75rem;
      line-height: 1.8rem;
      width: 3.75rem;
      font-size: 0.875rem;
      border: 0;
    }
    /*p{
      display: none;
    }*/
</style>
