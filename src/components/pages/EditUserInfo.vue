<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="修改用餐备注"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </div>
    <header class="start_header">
      <img src="@/assets/images/canju.png" /> 修改用餐人数
    </header>
    <p class="notice">请选择正确的用餐人数</p>
    <div class="content">
      <ul class="user_list">
        <li
          v-for="(item, key) in peopleList"
          :class="{ active: key == 0 }"
          :key="key"
        >
          <span class="people">{{ item }}</span>
        </li>
      </ul>

      <div class="remarkInfo">
        <input
          type="text"
          placeholder="请输入您的口味要求，忌口等(非必填)"
          v-model="p_mark"
        />
      </div>

      <div class="label">
        <ul class="mark_list">
          <li class="active">
            <span>打包带走</span>
          </li>
          <li>
            <span>微辣</span>
          </li>
          <li>
            <span>中辣</span>
          </li>
          <li>
            <span>特辣</span>
          </li>
          <li>
            <span>多放香菜</span>
          </li>
          <li>
            <span>多放葱花</span>
          </li>
          <li>
            <span>不要醋</span>
          </li>
           <li>
            <span>不要姜</span>
          </li>
        </ul>
      </div>
    </div>
    <van-submit-bar button-text="确认修改" size="large" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      p_num: '1人',
      p_mark: '',
      // api: Config.api,
      peopleList: [], //
    }
  },
  methods: {
    //点击更改按钮事件
    addChangeEvent() {
      //保存this
      var that = this
      //选择人数的dom操作
      var aLiDoms = document.querySelectorAll('.user_list li')
      // console.log(aLiDoms)
      for (var i = 0; i < aLiDoms.length; i++) {
        aLiDoms[i].onclick = function () {
          // 去掉所有li的class，让被点击的li添加active样式
          for (var j = 0; j < aLiDoms.length; j++) {
            aLiDoms[j].className = ''
            this.className = 'active' //this为li
            that.p_num = this.querySelector('span').innerHTML.trim() //trim()为原生js里的去除空格的方法
            console.log(that.p_num)
          }
        }
      }
      //选择口味的dom操作
      var aLi = document.querySelectorAll('.mark_list li')
      //给节点添加点击事件
      for (var k = 0; k < aLi.length; k++) {
        aLi[k].onclick = function () {
          //先清除所有li的class，给点击的li添加active样式
          for (var l = 0; l < aLi.length; l++) {
            aLi[l].className = ''
            this.className = 'active'
            // console.log(that.p_mark);
          }
          that.p_mark = `${that.p_mark} ${this.querySelector('span').innerText}`
        }
      }
    },
    //点击提交
    onSubmit() {
      const remarksList = {
        p_num: this.p_num,
        p_mark: this.p_mark,
        table_number:'03'
      }
      localStorage.remarksList = JSON.stringify(remarksList)
      this.$router.go(-1)
    },
    //获取用餐人数及备注信息
    getOrderInfo() {},
    goBack() {
      this.$router.go(-1)
    },
  },
  mounted() {
    //给用户列表添加数据
    for (var i = 0; i < 12; i++) {
      this.peopleList.push(i + 1 + '人')
    }
    //点击更改按钮事件
    this.$nextTick(() => {
      //先渲染完成dom节点
      this.addChangeEvent()
    })
    //获取用餐人数及备注信息
    this.getOrderInfo()
  },
}
</script>
<style scoped>
.start_header {
  height: 2.2rem;
  width: 8rem;
  line-height: 2.2rem;
  background: black;
  color: #fff;
  font-size: 0.85rem;
  margin: 6px auto 0;
  border-radius: 0.5rem;
}
.start_header img {
  height: 1.3rem;
  line-height: 1.3rem;
  position: relative;
  top: 0.5rem;
  left: 1rem;
  margin-right: 1rem;
}
.notice {
  color: red;
  font-size: 1rem;
  text-align: center;
  margin: 1rem 0;
}

.user_list,
.mark_list {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.user_list li,
.mark_list li {
  font-size:0.6 ;
  width: 25%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.user_list li span,
.mark_list li span {
  display: block;
  font-size: 0.85rem;
  width: 100%;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  background: #fff;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}
.active .people {
  color: #fff;
  display: block;
  background-color: red;
}
.remarkInfo {
  padding: 1rem;
  margin-top: 2rem;
}
.remarkInfo input {
  border: 1px solid #eeeeee;
  width: 100%;
  height: 2.6rem;
  line-height: 2.6rem;
  font-size: 0.85rem;
  border-radius: 0.5rem;
}
.edit_ok {
  width: 4.4rem;
  height: 4.4rem;
  background: red;
  position: fixed;
  bottom: 5rem;
  left: 50%;
  margin-left: -4.2rem;
  border-radius: 50%;
  color: #fff;
}
</style>
