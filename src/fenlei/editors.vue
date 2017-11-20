<template lang="html">
  <div class="zhubiao">
      <div class="lastnav">
          <span @click="ediGo()">〈</span>
          <span>主编</span>
      </div>
      <li v-for="item in editors" class="ediLi" @click="ediPush(item)">
          <img :src="attachImageUrl(item.avatar)" />
          <span class="editorName">{{item.name}}</span>
          <br/>
          <span>{{item.bio}}</span>
          <span>〉</span>
      </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
        editors:{}
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
    ediGo(){
      // 回到当前主编列表页面对应的主题
        this.$router.push('/list/cont/'+ this.$route.params.id)
    },
    // 跳转至主编详情页面并将当前收到的数据发送给主编详情页面使用
    ediPush(item){
        this.$router.push(
            {
                name: 'abc',
                params: {
                    item: item
                }
            }
        )
    }
  },
  created() {
    this.axios.get("api/theme/" + this.$route.params.id).then(data => {
      this.editors = data.data.editors;
    });
  }
};
</script>

<style scoped>
.lastnav{
    background-color: #028fd6;
    width: 100%;
    height: 2.3rem;
    line-height: 2.3rem;
    color: white;
}
.lastnav>span:nth-of-type(1){
    float: left;
    display: inline-block;
    width: 5rem;
    text-align: left;
}
.lastnav>span:nth-of-type(2){
    margin-left: -5rem;
}
.ediLi{
    list-style: none;
    text-align: left;
    border-bottom: 1px solid lightcyan;
    /* border-bottom: 1px solid black; */
    height: 4rem;
    position: relative;
}
.ediLi>img{
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-left: 1rem;
    margin-top: 0.8rem;
}
.ediLi>span:nth-of-type(1){
    font-size: 1rem;
    position: absolute;
    top: 1rem;
    left: 4.5rem;
}
.ediLi>span:nth-of-type(2){
    font-size: 0.8rem;
    position: absolute;
    top: 2.3rem;
    left: 4.5rem;
    color: #999;
}
.ediLi>span:nth-of-type(3){
    float: right;
    margin-top: -2.3rem;
}
</style>
