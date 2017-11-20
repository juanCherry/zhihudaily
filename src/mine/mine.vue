<template lang="html">
  <div class="mineWrap">
    <div  class="login div">
        <img class='touxiang' v-if='loginFlag' @click='showInfo()' :src='userphoto' alt="">
        <img class='touxiang' v-else src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511175350&di=93e54e82aedfcf85ddad59fad1e91499&imgtype=jpg&er=1&src=http%3A%2F%2Fimg2.nuandaoimg.com%2FPublic%2Fimages%2Fuploads%2Fsale%2F20141224%2F549a44027b455.jpg" alt="" >
        <span v-if='loginFlag'> {{ name }}已登录<a @click='quit()'>注销</a></span>
        <span @click='login()' v-else>登录/注册</span>
    </div>
    <div class="items">
        <MineComponent v-for='(item,index) in imgs' :urls='imgs[index]' :text='text[index]' ></MineComponent>
        <div class="night">
          <div class="bai" v-if='nightFlag' @click='changeModel()'>
            <span class="off"></span><span></span>
          </div>
          <div class="hei" v-else='nightFlag'
           @click='changeModel()'>
            <span ></span><span class="off"></span>
          </div>

        </div>
        <div class="font">
          <div class="small" v-if='fontFlag' @click='changeFont()'>
            <span class="off"></span><span></span>
          </div>
          <div class="big" v-else='fontFlag'
           @click='changeFont()'>
            <span ></span><span class="off"></span>
          </div>
        </div>
    </div>
    <IndexNav></IndexNav>
  </div>
</template>

<script>
import MineComponent from '../components/mineComponent/mineComponent'
import Login from '../mine/login'
import IndexNav from '../components/indexNav/indexNav'

import { setCookie, getCookie, delCookie} from '../assets/js/cookie.js'
export default {
  data() {
    return {
       name : '',
       userphoto : '',
       loginFlag : false,
       nightFlag : false,
       fontFlag : false,
      //  fontSize : '',
       imgs : ['https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1510557780&di=70f232e127db73acea0a458642425e8a&src=http://img.zcool.cn/community/01d19f55a2fa5532f8758bedacd89b.png',
       'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1510557567&di=3fb373a34c180c2cef22138d8b9029ed&src=http://img.25pp.com/uploadfile/app/icon/20160111/1452501198688680.jpg',
       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510567361149&di=e3412b9c08dd2af031fbbaf4ce1d0db1&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F88%2F81%2F04c58PIC3MI.png',
       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510567536287&di=516a9eb46b1f87c69f9a224c8bf4d985&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fsoft%2Fimages%2F2015%2F0716%2F20150716044822736.jpg',
       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510567806041&di=cf8319689c2a91069243b3dd8c6c4d74&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20151201%2F1448943439321449.jpg',
       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510675812769&di=ca613e3eeba9fa3a6a0ffd626a1b4131&imgtype=0&src=http%3A%2F%2Fimg.xiaohudie.net%2Ficon%402x.png'
       ],
       text : ['夜间模式','信息中心','已订阅分类','关于我们','设置字体','版本号']
    }
  },
  methods : {
    login() {
        this.$router.push({
          path : '/mine/login'
        })
    },
    quit() {
      delCookie('username');
      this.loginFlag = false;
    },
    // 更改夜间模式的方法
    changeModel() {
      let vuexNightFlag = this.$store.getters.getNightFlag

      if (vuexNightFlag == true) {
         vuexNightFlag = false;
      } else {
         vuexNightFlag = true;
      }
      this.nightFlag = vuexNightFlag;
      // 把已设置的夜间模式存入cookie中
      this.$store.commit('CHANGEL_MODEL',this.nightFlag)
    },
    // 更改字体的方法
    changeFont() {
      // 判断是否切换按下切换字体按钮
       let vuexFontFlag = this.$store.getters.getFontFlag;
       if (vuexFontFlag == true) {
           vuexFontFlag = false;
       } else {
          vuexFontFlag = true;
       }
       this.fontFlag = vuexFontFlag;
       if (this.fontFlag == false) {
          this.$store.commit('BIG_FONT','')
       } else {
           this.$store.commit('BIG_FONT', 'bigFont')
       }
       this.$store.commit('CHANGEL_FONT',this.fontFlag)
    },
    // 显示信息的方法
    showInfo() {
       this.$router.push({
         path: '/mine/showinfo'
       })
    }
  },
  components: {
    MineComponent,
    Login,
    IndexNav
  },
  //当页面每次加载的时候 判断是否已有用户登录
  mounted() {
    //页面获取保存的cookie值  渲染到页面上
    let uname = getCookie('username');
    this.name = uname;
    this.userphoto = getCookie('userphoto');
    // 如果cookie不存在  则跳转到登录页
    if (uname == '') {
      this.$router.push('/mine');
      this.loginFlag = false;
    } else {
       this.loginFlag = true;
    }
  }
}
</script>

<style lang="css" scoped>
    .div {
      background: #fafafa;
      margin-bottom: 1rem;
    }
    .login {
      margin-top: 0.5rem;
      height: 7rem;
      width: 100%;
    }
    .touxiang {
        height: 7rem;
        width: 7rem;
        border-radius: 50%;
        float: left;
        margin-left: 1.5rem;
    }
    .mineWrap {
      height: 38.1rem;
      width: 100%;
      overflow: hidden;
    }
    .mineWrap .login span {
      font-size: 1.5rem;
      line-height: 2rem;
      /*float: left;*/
      display: inline-block;
      margin-top: 2rem;
      /*margin-left: 1rem;*/
    }
    .mineWrap .login span a {
      display: block;
      font-size: 1rem;
      /*margin-left: 1rem;*/
    }
    .mineWrap .items {
      position: relative;
    }
    .mineWrap .items .night{
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      height: 1rem;
      width: 2rem;
      border: 0.01rem solid gray;
      /*overflow: hidden;*/
    }
     .mineWrap .items .font  {
       position: absolute;
       right: 1.5rem;
       top: 21.5rem;
       height: 1rem;
       width: 2rem;
       border: 0.01rem solid gray;
     }
     .night span {
       display: inline-block;
       height: 1rem;
       width: 1rem;
       background: lightgreen;
     }
     .font span{
      display: inline-block;
      height: 1rem;
      width: 1rem;
      background: lightgreen;
    }
    .mineWrap .night .off,.mineWrap .font .off{
      background: #fff;
    }
</style>
