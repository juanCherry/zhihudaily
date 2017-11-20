<template lang="html">
    <div class="version">
       <Top></Top>
       <span @click='versionBack()'>&lt;&nbsp;返回</span>

       <h2>{{ version }}</h2>
       <h2>已是最近版本</h2>
    </div>
</template>

<script>
import Top from '../components/header/top'
export default {
  data() {
    return {
      version : ''
    }
  },
  methods : {
     versionBack() {
        this.$router.push({
          path : '/mine'
        })
     }
  },
  created() {
     this.axios.get('api/version/android/2.3.0').then( data => {
       this.version = data.data.latest;
     })
  },
  components : {
    Top
  }
}
</script>

<style lang="css" scoped>
  .version {
    position: relative;
  }
  .version h2 {
    margin-top: 1rem;
    text-align: left;
    margin-left: 2rem;
    font-size: 1.5rem;
  }
  .version span {
    position: absolute;
    top: 0.2rem;
    left: 1rem;
    font-size: 1.5rem;
    color: #fafafa;
  }
</style>
