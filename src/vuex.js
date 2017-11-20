import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import { log } from 'util';

var date = new Date().getTime()


export default new Vuex.Store({
    state: {
      date : date ,
      //我的模块
       nightFlag : false,
       fontFlag : false,
       fontSize : ''

    },
    mutations:{
        ADD_PRICE(state,a){
            state.date = state.date - 24*60*60*1000;
        },
       //我的模块
       //修改夜间模式
        CHANGEL_MODEL(state, componentFlag) {
           state.nightFlag = componentFlag;
        },
        // 修改字体模式
        CHANGEL_FONT(state, componentFontFlag) {
          state.fontFlag = componentFontFlag;
        },
        // 修改字体的class属性
        BIG_FONT(state, componentFontSize) {
           state.fontSize = componentFontSize
        }
    },
    getters: {
        getNightFlag(state) {
            return state.nightFlag;
        },
        getFontFlag(state) {
            return state.fontFlag;
        },
        getFontSize(state) {
           return state.fontSize;
        }
    }
})
