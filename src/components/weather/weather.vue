<template>
  <div class="weather" @click="weather()">
      <span>{{ result.city }}/</span>
      <span>{{ result.wendu }}℃</span>
  </div>
</template>
<script>
export default {
    data(){
        return{
            result:{}
        }
    },
    methods:{
        weather(){
            this.$router.push({
                name:'weatherList',
                params:{
                    data:this.result
                }
                })
        }
    },
  created(){
    // 获取接口数据
       this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then((data) => {
            this.result = data.data.data;
        })
  }
}
</script>
<style scoped>
.weather{
    width: 6rem;
    height: 1.5rem;
    line-height: 1.6rem;
    position:absolute;
    top:0.42rem;
    margin-left: 1rem;
    border: 1px solid white;
    border-radius: 0.6rem;
    box-shadow: 0 0 1px 1px lightcyan;
}
.weather>span{
    color:lightcyan;
}

</style>
