import Home from '../pages/home'
import List from '../fenlei/list'
import Cont from '../fenlei/cont'
//文章全部内容
import NewsContent from '../components/newsContent/newsContent'

import AllHots from '../catagory/allHots'

// 作者列表
import Editors from '../fenlei/editors'
// 作者详情
import EdiData from '../fenlei/edidata'
//
import ShouCang from '../pages/shouCang'
import Mine from '../mine/mine'
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../mine/login'
import AboutUs from '../mine/aboutus'
import Version from '../mine/version'
import Comment from '../components/comment/comment'


import ShowInfo from '../mine/showinfo'
import WeatherList from '../components/weather/weatherList'
import Biaoji from '../components/map/biaoji'

Vue.use(VueRouter)

let routes = [
    { path : '/', component : Home},
    {path: '/home', component: Home},
{path:'/home/weather',name:'weatherList',component:WeatherList},
    // 分类
    {path:'/list',component:List,children:[
        {path:'/list/cont/:id',component:Cont}
    ]},
    //主页文章内容
    // {path:'/api/news/:id',component:NewsContent},
    // 作者相关路由
    {path:'/editors/:id',component:Editors},
    {path:'/edidata:id',name:"abc",component:EdiData},
    //
    {path: '/shouCang', component: ShouCang},
    {path: '/mine', component: Mine},
    { path : '/mine/login', component : Login},
    { path : '/mine/aboutus', component : AboutUs},
    { path : '/mine/version', component : Version},
    { path : '/mine/showinfo', component : ShowInfo},
    {path: '/list/cont/api/news/add',component:NewsContent},
    {path:'/catagory/allhot',component:AllHots,name:"hots"},
    {path:'/catagory/api/news/:id',component:NewsContent},

// 蒋梅娟
    {path:'/api/news/',component:NewsContent,name:'NewsContent'},
    {path:'/comment/:userid',component:Comment},
    { path : '/home/biaoji', name:'biaoji', component:Biaoji}


]
let router = new VueRouter({
    routes
})

export default router
