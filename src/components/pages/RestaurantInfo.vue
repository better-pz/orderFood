<template>
  <div>
    <van-nav-bar
      title="餐厅信息"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

 <van-collapse class="showitem" v-model="activeNames">
  <van-collapse-item title="餐厅名称"  icon="shop-o" name="1"><span>川霸味道</span> </van-collapse-item>
  <van-collapse-item title="营业时间" icon="clock-o"  name="2"><span>11:00-21:00</span> </van-collapse-item>
  <van-collapse-item title="菜品类型" icon="shop-o" name="3" ><span>川菜</span> </van-collapse-item>
  <van-collapse-item title="特色服务" icon="smile-o" name="4"><span>有包厢，提供在线菜单。</span> </van-collapse-item>
  <van-collapse-item title="地址" icon="location-o" name="5"><span>武汉武昌区丁字桥路44附5(武汉人家酒店对面)</span> </van-collapse-item>
  <van-collapse-item title="电话"  icon="phone-o" name="6"><span>15623272359</span> </van-collapse-item>


</van-collapse>
  </div>
</template>

<script>
  export default {
    data () {
      return {
         activeNames: ['1'],
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
.showitem span{
  color: gold;
}
</style>