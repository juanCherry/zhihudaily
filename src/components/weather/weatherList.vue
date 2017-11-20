<template lang="html">
  <div class="weatherList">
      <div class="weatherList_top"><span @click = "weatherList_top()">〈</span></div>
      <div class="weatherImg">
            <span class="">wlp   &nbsp;&nbsp;&nbsp;&nbsp;2017/11/11</span>
             <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510563976291&di=09374461b687c885bc3c783951383a67&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D3696260085%2C257163797%26fm%3D214%26gp%3D0.jpg"/>
      </div>
      <h2>中国天气</h2>
      <input type="text" placeholder="请输入城市" v-model="inputvalue" class="city" ref="city">
      <button @click="find()" type="button">查询</button>
      <div class="weatherToday">

        <h3 v-text="city"></h3>
        <h2 v-text="wendu"></h2>
        <h4 v-text="ganmao"></h4>
      </div>
      <ul class="weathFutrue">
            <li v-for="item in data.forecast">
                <p class="weathFutrue_date" v-text="item.date"></p>
                <p class="weathFutrue_high" v-text="item.high"></p>
                <p class="weathFutrue_low" v-text="item.low"></p>
            </li>
      </ul>
  </div>

</template>
<script>
export default {
    data(){
        return{
            result:'',
            data:{},
            inputvalue:"",
            cc:{},
            city:"",
            wendu:"",
            ganmao:""

        }
    },
  methods:{
      find(){

          this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.inputvalue).then(data=>{
              if(this.inputvalue == ''){
                  alert('请输入国内城市')
                  return
              }
              this.cc = ''
              this.inputvalue = ""
              this.data = data.data.data
              this.city = this.data.city + '市'
              console.log(this.city)
              this.wendu = this.data.wendu + '℃'
              this.ganmao = this.data.ganmao
          })
      },
      weatherList_top(){
          history.back()
      }
  },
  created(){
      this.cc = this.$route.params.data;
  }
}
</script>
<style scoped>
.weatherList_top{
    height: 0;
    position: relative;
}
.weatherList_top>span{
    position: absolute;
    left: 0;
    top: 0.7rem;
    color: white;
    font-size: 1.3rem;
    display: inline-block;
    width: 3.7rem;
    height: 2.7rem;
    line-height: 2.7rem;
}
.weatherImg>img{
    height:44rem;
    width:100%;
}
.weatherImg{
    z-index: -10;

    position: absolute;


}
.weatherImg>span{
    display:block;
    position:absolute;
    color:white;
    top: 32rem;
    left: 9.2rem;
    background-color:#0f2439;
}
.weatherList>h2{
    color:#fff;
    margin-top: 2rem;
}
.weatherList{
    overflow: hidden;
}
.weatherList>input{
    margin-top:1rem;
    height:1.7rem;
    width: 13rem;
    border: 1px solid lightblue;
    margin-bottom: 2.5rem;
    border-radius: 0.5rem 0 0 0.5rem;
    padding-left: 0.5rem;
    border-right:none;
    outline: none;
}
.weatherList>button{
    width:3rem;
    border:none;
    height:1.8rem;
    outline: none;
    border-radius: 0 0.5rem 0.5rem 0;
    margin-left: -0.29rem;
    vertical-align: middle;
    background-color: white;
    border: 1px solid lightblue;
    color: #028fd6;
}
.weatherToday{
    position: relative;
    margin-top:3rem;
    margin:0 auto;
    color: #fff;
    padding: 1rem 1rem;
    background-color: rgba(0,0,0,.5);
    border-radius: 0.7rem 0.7rem 0 0;
    width: 83%;
    height: 9rem;
}
.weatherToday>h3{
    position: absolute;
    font-size: 2rem;
    top: 1.5rem;
    left: 3rem;
    font-weight: 100;
    color: deepskyblue;
}
.weatherToday>h2{
    position: absolute;
    right: 2rem;
    top: 1.5rem;
    font-size: 2rem;
    font-weight: 100;
    color: salmon;
}
.weatherToday>h4{
    position: absolute;
    padding: 1rem 1rem;
    top: 4.5rem;
    font-size: 1.15rem;
    font-weight: 100;
    color: #999;
}
.weathFutrue{
    background-color: rgba(0,0,0,.5);
    border-radius: 0 0 0.7rem 0.7rem;
}
.weathFutrue{
    color: #fff;
    font-size: 1rem;
    z-index: 1000;
    width: 91%;
    margin: 0 auto;
    list-style: none;
}
.weathFutrue>li{
    position: relative;
    height: 4rem;
    padding: 0 1rem;
    border-bottom: 1px solid lightcyan;
    width: 90%;
}
.weathFutrue>li:nth-of-type(1){
    border-top: 1px solid lightcyan;
}
.weathFutrue_date{
    position: absolute;
    top: 1.3rem;
    left: 3rem;
    color: lightcyan;
}
.weathFutrue_high{
    position: absolute;
    top: 0.2rem;
    left: 12rem;
    color: orange;
}
.weathFutrue_low{
    position: absolute;
    bottom: 0.6rem;
    left: 15rem;
    color: skyblue;
}


</style>
