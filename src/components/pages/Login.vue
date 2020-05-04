<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <van-form @submit="axiosLoginUser">
      <van-field
        v-model="userName"
        required
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { pattern: pa1, message: '用户名由字母和数字组成，长度在2-7之间' },
        ]"
      />
     <van-field
    v-model="password"
    required
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ pattern:pa2, message: '密码字母和数字组成，长度在4-10之间' }]"
  />
      <div style="margin: 16px;">
        <van-button
          :loading="openLoading"
          round
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      password: "",
      pa1: /^[a-zA-Z0-9]{2,10}$/, 
      pa2: /^[a-zA-Z0-9]{4,10}$/,
      openLoading: false,
    };
  },
  created() {
      if (localStorage.userInfo) {
        Toast.fail("您已经登录");
        this.$router.push("/shoppingMall");
      }
  },
  methods: {
    goBack() {
      console.log("goback");
      this.$router.go(-1);
    },
    axiosLoginUser() {
      console.log(666);
      //先把按钮进行loading状态，防止重复提交
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve) => {
              // 本地存储保存用户登录状态
              let userInfo  = {
                userName: this.userName
              }
              localStorage.userInfo = JSON.stringify(userInfo)
              console.log(resolve);
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/shoppingMall");
              })
              .catch(() => {
                Toast.fail("登录失败");
                this.openLoading = false;
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
   
  },
};
</script>

<style scoped></style>
