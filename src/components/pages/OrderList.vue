<template>
  <div>
    <van-nav-bar
      title="订单查看"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <van-steps :active="active">
      <van-step>我已下单</van-step>
      <van-step>商家确认菜品</van-step>
      <van-step>菜品已经下厨</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <div class="cart-list">
      <div class="list-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="list-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="list-text">
          <div class="list-item-name">
            {{ item.Name }}
          </div>
          <div class="list-control">
            <van-tag round size="large" type="danger">{{
              remarksList.p_num
            }}</van-tag>
            <van-tag round size="large" type="danger">{{
              remarksList.p_mark
            }}</van-tag>
            <van-tag round size="large" type="danger">{{ remarksList.table_number }}号桌</van-tag>
          </div>
          <div class="cart-price">
            <div>￥{{ item.price | moneyFilter }}</div>
            <div>x{{ item.count }}</div>
            <div class="allPrice">
              ￥{{ (item.price * item.count) | moneyFilter }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="totalMoney">
      菜品总价：￥ {{ totalMoney | moneyFilter }}
      <van-button
        round
        icon="balance-o"
        size="normal"
        @click.stop.prevent="pay"
        type="danger"
      >
        立即支付
      </van-button>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
import Http from '@/Http.js'
import wx from 'weixin-js-sdk'

export default {
  data() {
    return {
      active: 1,
      cartInfo: [],
      wx: null,
      remarksList: [],
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getRemarksList() {
      localStorage.remarksList &&
        (this.remarksList = JSON.parse(localStorage.remarksList))
      console(this.remarksList)
    },
    getCartList() {
      //从浏览器本地存储获取购物车数据,将localStorage里面存储的字符串转换成对象
      localStorage.cartInfo &&
        (this.cartInfo = JSON.parse(localStorage.cartInfo))
      console.log(' this.cartInfo:' + JSON.stringify(this.cartInfo))
      this.isEmpty = this.cartInfo.length > 0 ? true : false
    },
    pay() {
      let params = {
        payAmount: this.totalMoney,
      }
      let promises = Http.post('/transaction/do', params)
      let that = this
      promises.then((response) => {
        if (response.status === 0) {
          let recordOrderGid = response.content.recordOrderGid
          try {
            this.wx.chooseWXPay({
              timestamp: response.content.timeStamp, // 支付签名时间戳，注意微信js   sdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: response.content.nonceStr, // 支付签名随机串，不长于 32 位  
              package: 'prepay_id=' + response.content.prepayId, // 统一支付接口   返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: response.content.signType, // 签名方式，默认为'SHA1'，      使用新版支付需传入'MD5'
              paySign: response.content.sign, // 支付签名
              success: function () {
                that.doWxPayCallback(recordOrderGid)
              },
              fail: function () {
                that.doWxPayCallback(recordOrderGid)
              },
              cancel: function () {
                console.info('取消支付，如需支付请继续。')
              },
            })
          } catch (e) {
            console.info('订单支付异常, 请稍后重试。')
          }
        } else {
          console.info(response.message)
        }
      })
    },
    // <!--
    //  微信支付结果处理
    //  循环调用后端获取支付结果，查询一定次数后跳转到账单或者结果页面，依据个人业务需求即可
    //  -->
    doWxPayCallback: function (recordOrderGid) {
      let taskCount = 0
      this.intervalid1 = setInterval(() => {
        taskCount++
        if (taskCount > 5) {
          clearInterval(this.intervalid1)
        }
        let statusPromise = this.queryOrderStatus(recordOrderGid)
        statusPromise.then((sta) => {
          if (sta.status === 0) {
            console.info(sta.content)
            let orderStatus = sta.content.status
            if (orderStatus === 1) {
              clearInterval(this.intervalid1)
              this.$router.push({
                path: 'resultOrder',
                query: {},
              })
            } else if (orderStatus === 2) {
              clearInterval(this.intervalid1)
              console.info('订单支付失败。')
            } else if (orderStatus === 0) {
              console.info('订单支付处理中')
            }
          }
        })
      }, 2000)
    },
    queryOrderStatus(orderGid) {
      let params = {
        orderGid: orderGid,
      }
      return Http.post('/transaction/order/status', params)
    },
  },
  created() {
    this.getCartList()
    this.getRemarksList()
    // <!--
    //  微信支付
    //  初始化微信支付jsApi配置，初始化参数由后端返回
    //  url 为前端当前域名，需与微信后台配置相同

    //  chooseWXPay 代表使用微信支付插件，还有很多其他插件，详情移步微信官方文档
    //  -->
    let config = {
      url: 'https://app.lianjia.oopmind.com/',
    }
    let promises = Http.post('/wx/getSdkConfig', config)
    promises.then((response) => {
      let content = response.content
      config.nonceStr = content.nonceStr
      config.signature = content.signature
      config.timestamp = content.timestamp
      config.appId = content.appId
      config.debug = true
      config.jsApiList = ['chooseWXPay']
      wx.config(config)
      wx.ready(() => {
        this.wx = wx
      })
      wx.error(function (res) {
        console.info('error 验证失败', res)
      })
    })
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  computed: {
    totalMoney() {
      let allMoney = 0
      this.cartInfo.forEach((item) => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    },
  },
}
</script>

<style scoped>
.cart-list {
  background-color: #fff;
}
.list-row {
  display: flex;

  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.list-img {
  flex: 6;
}
.list-text {
  flex: 14;
  padding-left: 10px;
}
.list-control {
  padding-top: 10px;
}
.cart-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoney {
  color: red;
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.bottom-button {
  width: 160px;
}
</style>
