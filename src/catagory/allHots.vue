<template lang="html">
  <div class="allHots">
    <div class="hotImg">
      <!-- 返回按钮 -->
      <p @click="backTo()">&lt;&lt;</p>
      <!-- 顶部背景图 -->
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511528036&di=1405d6a55c3c6ccf27d9cf8ca0766cbd&imgtype=jpg&er=1&src=http%3A%2F%2Fupload.newhua.com%2F2013%2F1119%2F1384826457135.png" alt="">
    </div>
    <div class="wenben">
      知乎日报实时热搜榜
    </div>
    <div class="hotContent">
      <pull-to :top-load-method="refresh">
        <ul>
          <!-- 显示文章标题的li -->
          <li v-for="(hot,index) in result" @click="push(hot.news_id,hot.title,hot.thumbnail,index)"><span>{{index+1}}</span><span>{{hot.title}}</span></li>
        </ul>
      </pull-to>

    </div>
    <div class="dothave">
      没有更多数据了
    </div>
  </div>
</template>

<script>
import pullTo from 'vue-pull-to'
export default {
  data(){
    return{
      result:{}  // 存放请求的json数据
    }
  },
  created(){
    localStorage.setItem(name,'5');
    // 请求json数据
    this.axios.get('api/news/hot').then((data) => {
      this.result = data.data.recent
    })
  },
  methods:{
    // 返回上一页
    backTo(){
      localStorage.setItem(name,'1');
      this.$router.push({
        path:'/list/cont/'+13
      })
    },
    push(id,title,images,index){
      // 点击文章标题，跳到完整文章内容页面
        this.$router.push({
          path:'/list/cont/api/news/add',
          name:'NewsContent',
          params:{
            id:id,
            title:title,
            images:images,
            index:index
          }
        })
    },
    refresh(loaded){
      setTimeout(() => {
        // this.dataList.reverse();
        this.axios.get('api/news/hot').then((data) => {
          this.result = data.data.recent
        })
        loaded('done');
      },2000)
    }
  },
  components:{
    pullTo
  }
}
</script>

<style lang="css" >
  .hotImg{
    height: 10rem;
    position: relative;
    z-index: 10
  }
  .hotImg>p{
    position: absolute;
    top: 0.3rem;
    left: 0.8rem;
    color: #fff;
    font-size:1.5rem;
  }
  .hotImg>img{
    width: 100%;
    height: 10rem;
  }
  .wenben{
    background-color: #f0f0f0;
    font-size: 0.9rem;
    padding: 0.3rem 1rem;
    text-align: left;
    color: #555;
    z-index: 20;
  }
  .hotContent li{
    height: 4rem;
    line-height: 4rem;
    border-bottom: 0.1rem solid #f0f0f0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    text-align: left;
    padding: 0 3%;
  }
  .hotContent li span:nth-of-type(1){
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.6rem;
    border-radius: 50%;
    background-color: #44cef6;
    margin-right: 1rem;
  }
  .hotContent li span:nth-of-type(2){
    display: inline-block;
  }
  .dothave{
    padding: 1rem 0;
    color: gainsboro;
  }
  .default-text{
    z-index: -3;
    margin-top: -1rem;
  }
</style>
