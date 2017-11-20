<template>
    <div id="wrap">
      <div id="posi">•&nbsp;&nbsp;地址&nbsp;&nbsp;•</div>
      <div class="amap-page-container" id="myMap">
        <el-amap :plugin="plugin"  ref="map":amap-manager="amapManager" vid="amap" :zoom="zoom" :center="center" class="amap-demo">
          <el-amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :visible="window.visible" :events="window.events"></el-amap-info-window>
        </el-amap>
        <div class="toolbar">
          <span v-if="loaded"></span>
          <span v-else>正在定位</span>
        </div>
      </div>
      <div id="go" @click="push()">〈</div>
    </div>
  </template>

<script>
import Vue from "vue";
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
  data() {
    let self = this;
    return {
      amapManager,
      zoom: 15,
      center: [116.41667, 39.91667],
      lng: 0,
      lat: 0,
      loaded: false,
      windows: [
        {
          position: [116.346274, 40.063252],
          content: "亚一程工作室 ❤",
          visible: true,
          events: {
            close() {
              console.log("close infowindow");
            }
          }
        }
      ],
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  methods: {
    push(){
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
#wrap {
  height: 42rem;
  background-color: lightcyan;
}
#myMap {
  height: 34.1rem;
  width: 100%;
  position: absolute;
  bottom: 5rem;
  left: 0;
}
#posi {
  width: 100%;
  margin: 0 auto;
  margin-right: 0;
  border-radius: 0 0 7rem 7rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: lightblue;
  color: whitesmoke;
  font-size: 1.3rem;
}
#go {
  position: absolute;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  top: 0.1rem;
  left: 1rem;
  z-index: 12;
}
.toolbar span{
  color: silver;
  background-color: lightcyan;
  display: inline-block;
  width: 100%;
  height: 2rem;
  margin-bottom: 0rem;
  border-bottom: 0;
}
</style>
