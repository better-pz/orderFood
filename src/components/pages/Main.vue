<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
     
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="fire-o">火爆菜品</van-tabbar-item>
      <van-tabbar-item icon="records">菜品分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购菜车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="1">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active:0,

    }
  },
  created(){
           this.changeTabBarActive()
       },
       updated(){
           this.changeTabBarActive()
       },
  methods: {
    changeTabBarActive(){
               this.nowPath = this.$route.path
               if(this.nowPath=='/cart'){
                   this.active=2
               }
           },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({name:'ShoppingMall'})
          break;
        case 1:
          this.$router.push({name:'CategoryList'})
          break;
        case 2:
          this.$router.push({name:'Cart'})         
          break;
        case 3:
          this.$router.push({name:'Member'})
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
