<template lang="html">
  <!-- 用来显示文章的评论数目 -->
  <div class="comment" :class="classType">
    <label>{{ comment }}条{{ type }}评</label>
    <img :src="url" alt="">
  </div>
</template>

<script>
export default {
   // 利用props的传值
   props:['comment','type','classType',"url"]
}
</script>

<style lang="css">
  *{
    padding: 0;
    margin: 0;
  }
  .comment{
    width:100%;
    height: 2.5rem;
    border-bottom: 1px solid #EDEDED;
  }
  .comment>img{
    height: 0.7rem;
    width:0.7rem;
    vertical-align: top;
    margin-top: 0.9rem;
    float: right;
    margin-right: 0.625rem;
  }
  .comment>label{
    padding-left: 0.625rem;
    line-height: 2.5rem;
    font-weight: 700;
  }
</style>
