Administrator 13:58:58
<template>
  <div>
        <div>
          <!-- 加载最新消息接口的数据 -->
            <ul class="ul-listContent">
                <li class="listContent" v-for="(item,index) in data " :key="index" @click="push(item.id,item.title,item.images,index)">
                    <span class="span1">{{item.title}}</span>
                    <span class="span2">
                        <img v-lazy="attachImageUrl(item.images[0])">
                    </span>
                </li>
            </ul>
            <!-- 加载过往新闻接口的数据 -->
             <ul class="ul-listContent">
        <li class="listContent" v-for="(item,index) in this.result " :key="index" @click="push(item.id,item.title,item.images,index)">

          <span class="span1">{{item.title}}</span>
          <span class="span2">
            <img v-lazy="attachImageUrl(item.images[0])">
          </span>
        </li>
      </ul>
      <!-- 导入无限加载组件 -->
     <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
  </div>
</template>
<script>
// 导入无限加载模块
import InfiniteLoading from "vue-infinite-loading";
// 导入将时间戳转换为时间字符串类型的组件
import {formatDate} from '../../../static/date'
export default {
  data() {
    return {
      data: {},
      bol1: true,
      list: [],
      result:[],
      bol2:false
    };
  },
  created() {
    this.axios.get("api/news/latest").then(data => {
      localStorage.setItem(name,"0");
      this.data = data.data.stories;
      this.bol1 = false;
    });
  },
  // updated() {
  //   console.log('hello world')
  //   console.log(this.result)
  //   // this.result.push(['hello','world'])
  // },
  methods: {
    // 获取最新的接口数据
     infiniteHandler($state) {
       this.$store.commit('ADD_PRICE',123)

             this.axios.get("api/news/before/" +  formatDate(new Date(this.$store.state.date), 'yyyyMMdd')).then(data => {

              // setTimeout(()=>{
              //  for(this.list in data.data.stories){
                 this.list = Object.assign(data.data.stories)
                //  console.log('yixia')
                //  console.log(this)
                //  console.log(this.list)
                //  console.log(formatDate(new Date(this.$store.state.date), 'yyyyMMdd'))
              //  }
               if(!this.bol2){
                //  console.log('aaaaaaaaaaaaaaaaaaaaaa')
                 this.result = this.list;
                //  console.log(this.result)
                 this.bol2 = true;
               }else {

                  // this.result = this.list;
                  // this.result.concat({id:'dd'})
                  // console.log(12331)
                  // console.log(this.result)
                  // console.log(1233)
                  for(let item of this.list){
                    this.result.push(item);
                  }

               }


              //  this.list = data.data.stories;

                $state.loaded();
                //  },1000)
             });


      },
      // 图片防盗链转换
    attachImageUrl: function(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\/p/g,
          "https://images.weserv.nl/?url=p"
        );
      }
    },
    // 跳转页面
    push(id,title,images,index){
      // console.log(id);
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
    }
  },
    components: {
      InfiniteLoading
    },
    // 将时间戳转换为时间类型的字符串所需的过滤器
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyyMMdd');
        }
    }
};
</script>
<style >
  .infinite-loading-container[data-v-9ac9b68a] [class^=loading-] {
    width: 2rem;
    height: 2rem;
  }

  .loading-default[data-v-9ac9b68a] {
    top: -2.7rem;
  }
* {
  padding: 0;
  margin: 0;
}
.ul-listContent {
  padding-left: 1.25rem;
}
.listContent {
  width: 100%;
  height: 3rem;
  padding: 1.25rem 0;
  position: relative;
  display: flex;
  border-bottom: 1px solid lightcyan;
}
.listContent > .span1 {
  flex: 1;
  margin-right: 0.6rem;
  line-height: 1.25rem;
  text-align: left;
}
.listContent > .span2 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 4.3rem;
  flex: 0 0 4.3rem;
  width: 4.3rem;
  height: 3.43rem;
  padding-right: 1.25rem;
}
.listContent > .span2 > img {
  width: 4.3rem;
  height: 3.4rem;
}
.loading {
  position: absolute;
  top: 45%;
  left: 35%;
  color: lightsteelblue;
}
</style>
