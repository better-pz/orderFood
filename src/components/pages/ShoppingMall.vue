<template>
<div>
  <van-nav-bar
        title="热门菜品"
      />
  <van-notice-bar text="亲爱的客官选择好了菜品就可以下单哦!!!" left-icon="volume-o" />

  <div class="banner-swipe">
   <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerArr" :key="index">
            <img :src="banner.imageUrl" width="100%"/>
        </van-swipe-item>
    </van-swipe>
  </div>

  <!-- 广告banner部分 -->
<div class="ad-banner">
    <img :src="adBanner.PICTURE_ADDRESS" width="100%">
</div>

<!--Recommend goods area-->
<div class="recommend-area">
    <div class="recommend-title">
        商品推荐
    </div>
    <div class="recommend-body">
      <!--swiper-->
        <swiper :options="swiperOption">
            <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                <div class="recommend-item">
                        <img :src="item.image" width="70%" />
                        <div>{{item.goodsName}}</div>
                        <div>￥{{item.price | moneyFilter}} (￥{{item.price | moneyFilter}})</div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</div>
<!-- 楼层的推介页面 -->
<!--floor one area-->
<floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
<floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
<floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>



<!--Hot Area-->
<div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
        <van-list>
            <van-row gutter="20">
    <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
        <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
    </van-col>
</van-row>
        </van-list>
    </div>
</div>
</div>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import axios from "axios";
import floorComponent from '../component/floorComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
// import url from '@/serviceAPI.config.js'
  export default {
    data () {
      return {
        category:[],
        adBanner:'',
        recommendGoods:[],  

        swiperOption:{
          sidesPerView:2
        },

        floor1:[],
        floor2:[],         //楼层2的数据
        floor3:[],         //楼层3的数据
        floorName:{},

        hotGoods:[],
        
        locationIcon : require('../../assets/location.png'),
        bannerArr : [ 
                {imageUrl:'http://pic1.juimg.com/180929/330862-1P92ZU2359-lp.jpg'},
                {imageUrl:'http://pic1.juimg.com/170107/330799-1F10G54A526-lp.jpg'},
                {imageUrl:' http://pic1.juimg.com/170104/330816-1F10401005987-lp.jpg'},

        ]
      }
    },
    filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
},
    components: {
      Swiper,
      SwiperSlide,
      floorComponent,
      goodsInfo
    },
  
    created () {
      axios({
        url:'https://www.fastmock.site/mock/08cb6ff9c6ddb91f885cf326981642f2/oderfood/index',
        method:'get'
      }).then( response =>{
        console.log(response)
         if ( response.status === 200) {
           this.category = response.data.data.category
           this.adBanner = response.data.data.advertesPicture //获得广告图片
           this.recommendGoods = response.data.data.recommend  //推荐商品
           this.floor1 = response.data.data.floor1              //楼层1数据
           this.floor2 = response.data.data.floor2              //楼层2数据
           this.floor3 = response.data.data.floor3              //楼层3数据
           this.floorName = response.data.data.floorName        //楼层名称
           this.hotGoods = response.data.data.hotGoods  
            
      }
      }) 
      .catch(erro => {
        console.log(erro) 
      })
    }
  } 
</script>

<style>
  .search-bar{
      height: 32px;
      background-color: #e5017d;
      line-height:32px;
      overflow: hidden;
  }
  .search-input {
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
       overflow: hidden;
      
  }
  .location-icon {
    padding-top: .2rem ;
    padding-left: .3rem;
    height: 32px;
  
  }
  .banner-swipe{
        clear:both;   
    }

   .type-list{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
  }
  .type-list div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }


 .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  } 
  .recommend-body{
       border-bottom: 1px solid #eee;
   }
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }

   .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:10rem;

     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;

  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }

  
  .floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      background-color: #fff;

  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }


  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
  .hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;

}
</style>