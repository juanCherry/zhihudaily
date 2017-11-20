<template>
  <div class="topText">
      <span>{{ topText }}</span>
  </div>
</template>
<script>
export default {
  props:['topText']
}
</script>
<style scoped>
.topText{
    /* float: left; */
    height: 0rem;
    text-align: center;
}
.topText>span{
    line-height: 2.5rem;
    font-size: 1.4rem;
    font-weight: 300;
    color: white;
}
</style>
