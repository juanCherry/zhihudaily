<template lang="html">
    <div>
      <div v-if="bol" id="loading">
        <img src="http://img.zcool.cn/community/0152b75824424ca84a0e282be1e705.gif" alt="">
      </div>
      <!-- 点击跳转 -->
        <div class="editors" v-else @click="eiPush()">
            <span>主编</span>
            <img v-for="item in editors" :src="attachImageUrl(item.avatar)"/>
            <span class="span2">〉</span>
        </div>
        <div v-for="(item,index) in stories" @click="push(item.id,item.title,item.images,index)" class="stories">
            <span>{{item.title}}</span>
            <img v-if="item.images" v-lazy="attachImageUrl(item.images[0])"/>
        </div>
        <div class="supp">

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id:'',
      editors: {},
      stories: {},
      bol: true
    };
  },
  methods: {
    attachImageUrl: function(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\/p/g,
          "https://images.weserv.nl/?url=p"
        )
      }
    },
    push(id,title,images,index){
        this.$router.push({
          path:'/api/news/',
          name:'NewsContent',
          params:{
            id:id,
            title:title,
            images:images,
            index:index
          }
        })
    },
    eiPush(){
      // 跳转至主编列表页面，展示每个主题对应的主编们
      this.$router.push('/editors/'+ this.$route.params.id)
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.axios.get("api/theme/" + newVal.params.id).then(data => {
        this.editors = data.data.editors;
        this.stories = data.data.stories;
      });
    }
  },
  created(){
    this.axios.get("api/theme/" + this.$route.params.id).then(data => {
      this.bol = false;
      this.editors = data.data.editors;
      this.stories = data.data.stories;
    });
  }
};
</script>

<style scoped>
  .editors{
      height: 3rem;
      line-height: 3rem;
      text-align: left;
      border-bottom: 1px solid lightgray;
      margin-top: 6.5rem;
  }
  .editors>span:nth-of-type(1){
      margin-left: 1rem;
  }
  .editors>.span2{
    float: right;
    margin-right: 1rem;
    margin-top: 0.3rem;
    display: inline-block;
    width: 2rem;
    height: 2rem;
    /* border:1px solid lightblue; */
    line-height: 2rem;
    text-align: right;
    font-weight: bold;
    border-radius: 50%;
  }
  .editors>img{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      vertical-align: middle;
      margin-left: 0.5rem;
  }
  .stories{
      text-align: left;
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      border-bottom: 1px solid lightcyan;
      /* border-bottom: 1px solid gray; */
      display: flex;
      justify-content: space-between;
      overflow: scroll;
  }
  .stories>span{
      display: inline-block;
      height: 3rem;
      white-space: pre-wrap;
      margin-bottom: 1rem;
  }
  .stories>span:nth-of-type(1){
      margin-top: 1.2rem;
  }
  .stories>img{
    width: 4.5rem;
    height: 3.3rem;
    margin-top: 1rem;
    margin-left: 1rem;
  }
  #loading {
    position: absolute;
    top: 20rem;
    left: 0;
    width: 50rem;
    height: 100%;
  }
  #loading img {
     width: 12rem;
     margin-left: -30rem;
  }
  .supp{
    height: 3rem;
    width: 100%;
  }
</style>
