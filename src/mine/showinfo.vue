<template lang="html">
    <div class="showinfo">
         <div class="info">
            <Top></Top>
             <span class="back" @click='back()'>&lt;&nbsp;返回</span>
            <img :src="img" alt="">
            <h2>用户名： {{ userid }}</h2>
            <h2>电话： {{ userphone }}</h2>
            <h2>性别: {{ usersex }}</h2>
            <h2>个人介绍: {{ usershowme }}</h2>
         </div>
    </div>
</template>

<script>
import { setCookie, getCookie, delCookie} from '../assets/js/cookie.js'
import Top from '../components/header/top'
export default {
  data() {
    return {
     img : '',
     userid : '',
     userphone : '',
     usersex : '',
     usershowme : ''
   }
  },
  components: {
    Top
  },
  created() {
    this.img = getCookie('userphoto');
    let name = getCookie('username');
    // 获取数据
    this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid=' + name).then( res =>{
       console.log(res);
       this.userid = res.data.userid;
       this.userphone = res.data.userphone;
       this.usersex = res.data.usersex;
       this.usershowme = res.data.usershowme;
    })
  },
  methods : {
    back() {
      this.$router.push('/mine/login')
    }
  }
}
</script>

<style lang="css" scoped>
  .info img {
    margin-top: 1rem;
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
  }
  .info{
    position:  relative;
  }
  .info .back {
     position: absolute;
     top: 0.2rem;
     left: 0.5rem;
     color: #fafafa;
     font-size: 1.5rem;
  }
  .info h2:nth-of-type(1) {
    margin-top: 2rem;
  }
  .info h2 {
    color: #333;
    margin-bottom: 1rem;
  }
</style>
