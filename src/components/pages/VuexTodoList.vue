<template>
  <div id="app">
    <van-nav-bar
      title="餐厅留言板"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <van-field
      v-model="sms"
      center
      clearable
      label="留言"
      autosize
      placeholder="说你想说"
    >
      <template #button>
        <van-button size="small" @click="addLIst" type="primary"
          >添加</van-button
        >
      </template>
    </van-field>

    <div class="my_ask">
      <div v-for="(item, key) in sakList" :key="key">
        {{ item.title}}
        <van-button size="mini" type="danger" @click="deleteLIst(key)">删除</van-button>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      sms: '',
      sakList: [
      
      ],
    }
  },
  created() {
 
    this.getSakList()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getSakList() {
      //从浏览器本地存储获取购物车数据,将localStorage里面存储的字符串转换成对象
      localStorage.sakList &&
        (this.sakList = JSON.parse(localStorage.sakList))
     
    },
    addLIst() {

      this.sakList.push({
        title: this.sms,
        checked: false,
      })
      this.sms = ''
     localStorage.sakList = JSON.stringify(this.sakList)
    console.log(localStorage.sakList)
    },
    deleteLIst(key) {
     this.sakList.splice(key, 1);
      localStorage.removeItem('sakList')
    },
  },
 
}
</script>

<style scoped>
.my_ask div {
  margin: 16px;
}
</style>
