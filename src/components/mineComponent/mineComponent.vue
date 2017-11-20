<template lang="html">
     <div class="wrap" @click='update()'>
         <img :src="urls" alt="">
         <span>{{ text }}</span>
     </div>
</template>

<script>
export default {
   props:['urls','text'],
   data () {
     return {
      //  model : 'false'
     }
   },
   methods : {
     update(){
       if (this.text == '夜间模式') {
          // console.log('夜间模式');
       } else if (this.text == '已订阅分类') {
           this.$router.push({
              path : '/list/cont/13'
           })
       } else if (this.text == '关于我们') {
           this.$router.push({
             path : '/mine/aboutus'
           })
       } else if (this.text == '版本号') {
           this.$router.push({
             path : '/mine/version'
           })
       }  else {
         this.$router.push({
           path : '/mine'
         })
       }
     }
   }
}
</script>

<style lang="css" scoped>
  .wrap {
    height: 4rem;
    width: 100%;
    background: #fafafa;
    margin-bottom: 1rem;
  }
  .wrap img {
    float: left;
    margin-left: 1.5rem;
    margin-top: 1rem;
    height: 2rem;
    width: 2rem;
  }
  .wrap span {
    float: left;
    margin-left: 2rem;
    line-height: 4rem;
    font-size: 1.3rem;
  }
</style>
