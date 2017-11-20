<template lang="html">
  <div class="all" @click.stop="all()">
    <div class="search">
      <div class="realSearch">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510568078001&di=2d88a2c478d31fbcde8fded1a53166a5&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F64%2F72%2F27K58PICFYV_1024.jpg" alt="">
        <input v-model="kWords" type="text" name="" value="" placeholder="大家都在找" @click.stop="ss()">
        <button @click="allHots()" type="button" name="button">搜索</button>
      </div>
    </div>
    <!-- 点击input搜索框显示的热搜框 -->
    <div class="hotSearch" :class = "isShow">
      <ul start="1" class="hotUl" v-if="reIsShow">
        <li class="resou" @click="allHots()"><a>&gt;&gt;查看全部热搜</a></li>
        <li :class="{'active':index==a}" v-for="(content,index) in result" @click="push(content.news_id,content.title,content.thumbnail,index)" @touchstart="start(index)" @touchend="end()"><span>{{index+1}}</span><a>{{ content.title }}</a></li>
      </ul>
      <!-- 显示通过关键字搜索查找出来的新闻 -->
      <ul class="searNews" v-else>
        <li v-for="(items,index) in allMsg" @click="push(items.news_id)">{{ items.title }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  props:['message'],
  data(){
    return{
      kWords:'', // 存输入框v-model的值的变量
      result:{}, // 存请求json数据返回结果的变量
      a:'',  // 用来控制li标签类值的变量
      showFlag:false,
      isShow:'isshow',  //控制热搜框的外层div是否显示(类值变量)
      t:[],   // 搜索文章时，用来存符合条件文章的标题
      reIsShow:true,  //控制显示热搜内容的li是否显示
      allMsg:[]  // 存符合搜索条件新闻的所有内容 的变量
    }
  },
  methods:{
    ss(){
      // 点击input标签，让热搜div显示
      this.isShow = ''
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
    allHots(){
      // 点击查看所有热搜按钮，跳到所有热搜页
      // console.log(11);
      this.$router.push({
        path:'catagory/allhot',
        name:"hots"
      })
    },
    // 当点击某个li标签时，通过控制类值来调整样式
    start(inde){
      this.a = inde
    },
    end(){
      this.a = ''
    },
    all(){
      // 当点击非输入框的位置是，隐藏热搜的div
      this.isShow = 'isshow'
    }
  },
  watch:{
    // 通过监听输入框值的变化，实现搜索功能
    kWords(newVal,oldVal){
      if (newVal == '') {
        this.reIsShow = true;
        this.allMsg = []
        this.t = []
      }else {
        this.reIsShow = false;
        for (let i = 0; i < this.result.length; i++) {
          let allt = this.result[i].title;
          if (allt.indexOf(newVal) != -1) {
            if(this.t.indexOf(allt) == -1){
              this.allMsg.push(this.result[i])
              this.t.push(allt);
            }
          }
        }
      }
    }
  },
  created(){
    this.axios.get('api/news/hot').then((data) => {
      // console.log(data.data.recent);
      this.result = data.data.recent
    })
  }
}
</script>
<style lang="css">
  .search{
    background-color: #028fd6;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 32;
  }
  .realSearch{
    width: 80%;
    background-color: #fff;
    border-radius:2rem;
    padding: 0.03rem 0.5rem;
  }
  .realSearch>img{
    width: 1.1rem;
    vertical-align: top;
    margin-top: 0.5rem;
  }
  .realSearch input{
    border: none;
    outline: none;
    font-size: 1rem;
    margin: 0.5rem 0.7rem;
    width: 70%;
    border-right: 1px solid #028fd6;
  }
  .realSearch button{
    background-color: #fff;
    border: none;
    outline: none;
    font-size: 1rem;
  }
  .hotSearch{
    position: fixed;
    top: 4rem;
    background-color: #fff;
    z-index: 20;
    width: 95%;

    overflow: hidden;
    border:1px solid orange;
    border-top: none;
    margin-left: 2%;
  }
  .hotUl{
    width: 100%;
    height: 20.7rem;
  }
  .hotUl>li{
    text-align: left;
    height: 2.5rem;
    width: 94%;
    line-height: 2.5rem;
    border-bottom: 0.1rem solid #f0f0f0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 3%;
  }
  .searNews>li{
    text-align: left;
    height: 3rem;
    width: 92%;
    line-height: 3rem;
    border-bottom: 0.1rem solid #f0f0f0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 4%
  }
  .active{
    background-color: #f0f0f0;
  }
  .hotUl>li>a{
    /*padding: 0 2rem;*/
    padding-left: 1rem;
    text-decoration: none;
  }
  .hotUl>li>span{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    /*padding: 0 0.9rem 0 1.8rem;*/
    border-radius: 50%;
    background-color: orange;
    line-height: 1.6rem;
    text-align: center;
  }
  .isshow{
    display: none;
  }
</style>
