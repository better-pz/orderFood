<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="已选菜品" />
    </div>
    <div v-if="isEmpty">
      <!--一键清空购物车按钮 -->
      <div class="cart-title">
        <div class="table_number">
        当前桌号 : 03
       </div>
        <vant-button>
          <van-button size="small" type="danger" @click="clearCart" plain>清空菜单车</van-button>
        </vant-button>
      </div>

      <div class="p_number">
        <div class="p_number_left">
          <div class="p_number_left_people">用餐人数：{{ remarksList.p_num }}</div>
          <div>备注：<span>{{remarksList.p_mark}}</span></div>
        </div>
        <div class="p_number_right">
          <router-link to="edituserinfo">
            <img src="@/assets/images/edit.png" />
            <div>修改</div>
          </router-link>
        </div>
      </div>

      <!-- 购车商品展示 -->
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
              <van-stepper v-model="item.count" />
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
      <!--显示总金额-->
      <div class="totalMoney">
        菜品总价：￥ {{ totalMoney | moneyFilter }}
        <van-button size="normal" @click="toOdder" type="danger"
          >确认下单</van-button
        >
      </div>
    </div>
    <div v-else class="cart-nodata">
      <van-empty description="您还没有点餐,请点击菜品分类开始点餐" />
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false, //购物车是否为空
      cartNum: 1,
      remarksList:[]
    }
  },
  methods: {
    // 获取购物车数据
    getCartList() {
      //从浏览器本地存储获取购物车数据,将localStorage里面存储的字符串转换成对象
      localStorage.cartInfo &&
        (this.cartInfo = JSON.parse(localStorage.cartInfo))
      this.isEmpty = this.cartInfo.length > 0 ? true : false
    },
    getRemarksList(){
      localStorage.remarksList && (this.remarksList=JSON.parse(localStorage.remarksList))
      console(this.remarksList)
    },
    clearCart() {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
      this.isEmpty = false
    },

    toOdder() {
      this.$router.push({ name: 'OrderList' })
    },

  },
  created() {
    this.getCartList()
    this.getRemarksList()
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
.p_number {
  font-size: 0.85rem;
  border-radius: 0.5rem;
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid #eeeeee;
}
.p_number_left {
  flex: 1;
}
.p_number_left div {
  line-height: 2rem;
}
.p_number_left_people {
  margin-bottom: 1px;
  color: red;
}
.p_number_right {
  width: 4rem;
  height: 4rem;
  text-align: center;
}
.p_number_right img {
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 auto;
}

.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
  display: flex;
  justify-content: space-between;
}
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
