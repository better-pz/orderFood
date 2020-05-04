<template>
  <div>
    <div>
      <van-nav-bar title="个人中心" />
    </div>
    <div class="top">
      <div class="my_name"> {{userInfo.userName}}</div>
      <img
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        class="top-img"
      />
      <div class="table_number">
        当前桌号 : 03
      </div>
    </div>
    <div v-if="!isLogin" class="login">
      <div>
        <router-link to="login">
          <van-button type="warning">
            我要登录
          </van-button>
        </router-link>
      </div>
      <div>
        <router-link to="register">
          <van-button type="primary">
            我要注册
          </van-button>
        </router-link>
      </div>
    </div>
    <div>
      <van-cell-group>
        <router-link to="orderList">
          <van-cell title="我的订单" is-link />
        </router-link>
        <router-link to="restaurantInfo">
        <van-cell title="餐厅信息" is-link />
        </router-link >
         <router-link to="todoList">
        <van-cell title="留言板" is-link />
        </router-link >
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
      </van-cell-group>
      
    </div>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1587401652,
  endAt: 1592672051,
  valueDesc: '1.5',
  unitDesc: '元',
};
export default {
    data() {
    return {
      userInfo:{},
      showList:false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      isLogin:false
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange() {
      this.coupons.push(coupon);
    },
    getUserInfo(){
    
      localStorage.userInfo && (this.userInfo = JSON.parse(localStorage.userInfo))
      this.isLogin = localStorage.userInfo ? true :false
 
    }
  },
  created(){
    this.getUserInfo()
  }
}
</script>

<style scoped>
.top-img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
}
.my_name{
  height: 2rem;
  line-height: 2rem;
  font-size: 1.3rem;
  color: #2b3308;
}
.top {
  height:9rem;
  text-align: center;
  background-color: #eea2ad;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
.table_number {
  height: 2rem;
  line-height: 2rem;
  color: #15941f;
}
</style>
