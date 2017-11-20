<template lang="html">
    <div class="loginWindow">
       <form class="" action="#" method="post" v-show='showLogin'>
         <div class="">
             <Top></Top>
             <span class="back" @click='back()'>&lt;&nbsp;返回</span>
         </div>
         <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510328694857&di=15b073665aea5651e4eaf35968c811fb&imgtype=0&src=http%3A%2F%2Fawb.img.xmtbang.com%2Fimg%2Fuploadnew%2F201510%2F23%2F3c9ac94c7f854e2baa8ea1696f1341cc.jpg" alt="">

         <h2>知乎账号登录</h2>
         <p v-show='showTishi'> {{ tishi }}</p>
         <input type="text" name="" v-model="username"  placeholder='请输入用户名'>
         <input type="password" name="" v-model='password' placeholder='请输入密码'>
         <button type="button" name="button" @click='login()'>登录</button>
         <span>还没有账号？<a @click='ToRegister()'>去注册</a>?</span>

         <!-- <h5>有问题？请联系客服</h5> -->
       </form>
       <form class="" action="#" method="post" v-show='showRegister'>
         <div class="">
             <Top></Top>
             <span class="back" @click='back()'>&lt;&nbsp;返回</span>
         </div>
         <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510328694857&di=15b073665aea5651e4eaf35968c811fb&imgtype=0&src=http%3A%2F%2Fawb.img.xmtbang.com%2Fimg%2Fuploadnew%2F201510%2F23%2F3c9ac94c7f854e2baa8ea1696f1341cc.jpg" alt="">
         <h2>知乎账号注册</h2>
         <p v-show='showTishi'> {{ tishi }}</p>
         <input type="text" name="" v-model="newusername"  placeholder='请输入用户名'>
         <input type="text" name="" v-model='newpassword' placeholder='请输入密码'>
         <button type="button" name="button" @click='register()'>注册</button>
         <span>已有账号？<a @click='ToLogin()'>马上登录</a>?</span>
         <!-- <h5>有问题？请联系客服</h5> -->
       </form>
    </div>
</template>

<script>
import Top from '../components/header/top'
import {setCookie, getCookie} from '../assets/js/cookie.js'
export default {
    data() {
      return {
        username : '',
        password : '',
        showLogin : true,
        showRegister : false,
        newusername : '',
        newpassword : '',
        showTishi : false,
        tishi : ''
        // usernameData : ['zyx'],
        // passworData : ['111']
      }
    },
    methods : {
      back() {
        this.$router.push({
          path :'/mine',
        })
      },
      ToRegister() {
        this.showTishi = false;
        this.showRegister = true;
        this.showLogin = false;
        this.username = '';
        this.password = '';
      },
      ToLogin() {
        this.showTishi = false;
        this.showRegister = false;
        this.showLogin = true;
        this.newusername = '';
        this.newpassword = '';
      },
      // 登陆方法
      login(){
        if (this.username == '' || this.password == ''){
           this.showTishi = true;
           this.tishi = '请输入用户名或者密码';
        } else {
           this.axios.post('http://txspring.cn:8010/getUser', this.qs.stringify({
             user : this.username,
             password : this.password
           })).then( res => {
             console.log(res);
             if (res.data.type==0) {
                   this.showTishi = true;
                   this.tishi = '用户名或密码不正确';
                   this.username = '';
                   this.password = '';
             } else {
                   this.showTishi = true;
                   this.tishi = '登录成功';
                   setCookie('username',this.username, 1000*60);
                   setCookie('userphoto', 'http://img3.imgtn.bdimg.com/it/u=3954113928,955482909&fm=214&gp=0.jpg', 1000 * 60);
                   setTimeout(function () {
                      this.$router.push(
                        { path : '/mine'}
                      );
                      this.username = '';
                      this.password = '';
                      this.showRegister = false;
                      this.showLogin = true;
                      this.showTishi = false;
                   }.bind(this),1000)
             }
           })
        }
        let photo = getCookie('userphoto');
        this.axios.post('http://txspring.cn:8010/updateUser', this.qs.stringify({
            type:"userall",
            usersex : 'girl',
            usershowme : '我叫周小花',
            userphone : '13466489427',
            userphoto : photo,
            userid : 'zyx0427'
        })).then( res => {
            //console.log(res);
            // console.log('修改成功');
        }).catch( res=> {
          // console.log(res);
        });
      },
      // 注册方法
      register() {
           if (this.newusername == '' || this.newpassword == '') {
             this.showTishi = true;
             this.tishi = '用户名或者密码不能为空';
           } else {
             this.axios.post('http://txspring.cn:8010/addUser', this.qs.stringify({
                user : this.newusername,
                password : this.newpassword
             })).then( res => {
               if (res.data.type == '1') {
                   this.tishi = '注册成功';
                   this.showTishi = true;
                   setTimeout(function () {
                      this.$router.push(
                        { path : '/mine/login'}
                      );
                      this.showRegister = false;
                      this.showLogin = true;
                      this.showTishi = false;
                   }.bind(this),1000)
                } else {
                  this.showTishi = true;
                  this.tishi = '用户名或密码输入格式不正确';
                  this.username = '';
                  this.password = '';
                }
             })
           }

        }
      },
    watch : {
       username(newValue, oldValue){
           this.username = newValue;
       },
       password(newValue, oldValue) {
         this.password = newValue;
       },
       newusername(newValue, oldValue){
         this.newusername = newValue;
       },
       newpassword(newValue,oldValue){
         this.newpassword = newValue;
       }
    },
    components: {
      Top
    },
    mounted(){
      //  如果存在username和cookie  则跳转主页  不需要登录
      if (getCookie('username')) {
        this.$router.push('/mine');
      }
    }
}
</script>

<style lang="css" scoped>
     .loginWindow {
        height: 120rem;
        width: 100%;
        text-align: center;
        border: 1px solid gray;
        background: white;
        position: absolute;
        top: 0;
        left:0;
     }
     form>input {
       height: 2.0rem;
       width: 80%;
       margin-bottom: 1.5rem;
       outline: 1px solid gray;
       text-align: center;
       font-size: 1.2rem;
     }
     form>button {
       width: 82%;
       font-size: 1.2rem;
       background: #028fd6;
       height: 2.0rem;
       color: #fafafa;
       /*float: left;*/
     }
     form h2 {
       margin-bottom: 1.5rem;
       margin-top: 1rem;
     }
     form>span {
       display: block;
       /*margin-left: 2rem;*/
       margin-top: 1rem;
     }
     .back {
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        font-size: 1.4rem;
        color: #f0f0f0;
     }
     form>img {
       margin-top: 3.5rem;
     }
     /*form h5 {
       margin-top: 1rem;
     }*/
     span a {
       color: blue;
       text-decoration: underline;
     }
     form p {
       color: red;
     }
</style>
