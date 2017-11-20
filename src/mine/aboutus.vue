<template lang="html">
   <div class="">
        <Top></Top>
        <span class="back" @click='back()'>&lt;&nbsp;返回</span>
        <ul>
          <li v-for='item of obj'>
            <span class="username">{{ item.name +':' }}</span>
            <span class="password">{{ item.tel }}</span>
          </li>
        </ul>
   </div>
</template>

<script>
import MineComponent from '../components/mineComponent/mineComponent'
import Top from '../components/header/top'
export default {
  data() {
    return {
       obj :[
         {name : '周仙女', tel : 13466489427},
         {name : '郑仙女', tel : 13436346157},
         {name : '蒋仙女', tel : 18249628056},
         {name : '张仙女', tel : 13718971179},
         {name : '王鲜肉', tel : 15145938555}
      ]
    }
  },
  methods : {
    back() {
      this.$router.push({
         path : '/mine'
      })
    }
  },
  components : {
    MineComponent,
    Top
  }
}
</script>

<style lang="css" scoped>
  .back {
     position: absolute;
     top: 0.3rem;
     left: 0.5rem;
     font-size: 1.4rem;
     color: #f0f0f0;
  }
  ul {
    list-style: none;
    text-align: left;
    padding: 0.5rem;

  }
  li {
    text-align: left;
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }
  .password {
    display: inline-block;
    margin-left: 1rem;
    color: #028fd6;
  }
</style>
