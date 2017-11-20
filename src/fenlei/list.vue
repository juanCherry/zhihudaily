<template>
    <div class="list">
        <Search></Search>
        <div class="ul">
            <router-link :to="'/list/cont/'+sub[0].id" @click.native="make0()">{{sub[0].name}}</router-link>
            <router-link :to="'/list/cont/'+sub[1].id" @click.native="make1()">{{sub[1].name}}</router-link>
            <router-link :to="'/list/cont/'+sub[2].id" @click.native="make2()">{{sub[2].name}}</router-link>
        </div>
        <Index-nav></Index-nav>
        <router-view></router-view>
    </div>
</template>

<script>
import IndexNav from '../components/indexNav/indexNav'
import Search from '../search/search'
export default {
    components:{
      IndexNav,
      Search
    },
    data(){
        var shuju = [];
        for(var i = 0; i < 3; i++){
            shuju.push({id:"",name:""});
        }
        return {
            sub:shuju
        }
    },
    created(){
        this.axios.get('api/themes').then((data)=>{
            this.sub = data.data.others;
        })
    },
    methods:{
      make0(){
        localStorage.setItem(name,"1");
      },
      make1(){
        localStorage.setItem(name,"2");
      },
      make2(){
        localStorage.setItem(name,"3");
      }
    }
}
</script>

<style scoped>
.list{
  position: relative;
  width: 100%;
}
.ul {
  position: fixed;
  top: 4rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.ul > a {
  text-decoration: none;
  background-color: lightblue;
  color: gray;
  height: 2.5rem;
  line-height: 2.5rem;
  width: 33.33%;
  font-size: 1rem;
  font-weight: bold;
}
.ul .router-link-active {
  background-color: lightcyan;
}
</style>
