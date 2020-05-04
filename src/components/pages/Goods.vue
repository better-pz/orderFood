<template>
  <div>
    <van-nav-bar
      title="美味详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="name">{{ goodsInfo.NAME }}</div>
    <div class="price">价格:{{ goodsInfo.PRESENT_PRICE | moneyFilter }}</div>

    <van-tabs sticky swipeable>
      <van-tab title="菜品详情">
        <div class="detail" v-html="goodsInfo.DETAIL"></div>
      </van-tab>
      <van-tab title="菜品评价">
        <div class="evaluate" id="evaluate">
       <div>推荐指数: <van-rate v-model="givenum" icon="like" void-icon="like-o" /></div>
       <div>色: <van-rate v-model="colornum" icon="like" void-icon="like-o" /></div>
       <div>香: <van-rate v-model="weidao" icon="like" void-icon="like-o" /></div>
       <div>味: <van-rate v-model="wei" icon="like" void-icon="like-o" /></div>
       <div>味<van-rate v-model="wei" icon="like" void-icon="like-o" /></div>
       <div>味<van-rate v-model="wei" icon="like" void-icon="like-o" /></div>


        </div>
       
      </van-tab>
    </van-tabs>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart"
          >加入购菜车</van-button
        >
      </div>
      <div>
        <van-button size="large" @click="showShare = true" type="danger">分享此菜品</van-button>
      </div>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onShare"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      givenum:5,
      colornum:4,
      weidao:4.5,
      wei:5,
      goodsID: '',
      goodsInfo: {}, //商品详细数据
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
      ],
    }
  },
  methods: {
    onSelect(option) {
      Toast(option.name)
      this.showShare = false
    },
    goBack() {
      this.$router.go(-1)
    },
    getInfo() {
      console.log(666)
      axios({
        url: url.getDetailGoodsInfo,
        method: 'post',
        data: {
          goodsId: this.goodsID,
        },
      })
        .then((response) => {
          console.log(response)
          response.data.code === 200 && response.data.message
            ? (this.goodsInfo = response.data.message)
            : Toast('服务器错误，数据取得失败')
          console.log(this.goodsInfo)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addGoodsToCart() {
      // 取出本地购物车中的商品数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : []
      //判断当前商品是否已经加入购物车
      let isHaveGoods = cartInfo.find((cart) => cart.goodsId == this.goodsID)
      console.log(isHaveGoods)
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1,
        }
        cartInfo.push(newGoodsInfo) //添加到菜单
        localStorage.cartInfo = JSON.stringify(cartInfo) //存储本地
        Toast.success('添加成功')
      } else {
        Toast.success('您已添加了这个菜啦')
      }
      this.$router.push({ name: 'Cart' }) //进行跳转
    },
    onShare () {
      this.$wxShare(
      {
        title: "你好", // 分享标题
        desc: "", // 分享描述
        link: location.href, // 分享链接
        imgUrl: `` // 分享图标
      },
      () => {
         Toast('分享成功')
      }
    )
    console.log(666)
      this.showShare = false

    }
    
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  created() {
    this.goodsID = this.$route.query.goodsID
      ? this.$route.query.goodsID
      : this.$route.params.goodsID
    //  console.log(this.goodsId)
    this.getInfo()
  },
 mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('evaluate').style.height = winHeight - 48+ 'px'
    
  },
}
</script>

<style scoped>
.detail {
  font-size: 0px;
}
.name {
  padding-left: 10px;
  background-color: #fff;
}
.price {
  color: red;
  padding-left: 10px;
  margin-top: 5px;
  background-color: #fff;
}
.goods-bottom {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
.evaluate >div{
padding: 5px;
margin-left: 5px;
overflow: scroll;
}
</style>
