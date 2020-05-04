<template>
  <div>
    <van-nav-bar
  title="用户注册"
  left-text="返回"
  left-arrow
  @click-left="goBack"
/>
<van-form @submit="axiosRegisterUser">
  <van-field 
    v-model="userName"
    required
    name="userName"
    label="用户名"
    placeholder="用户名"
    :rules="[{ pattern:pa1, message: '用户名由字母和数字组成，长度在2-7之间' }]"
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
    <van-button :loading="openLoading" round block type="info" native-type="submit" >
      注册
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
  export default {
    data () {
      return {
      userName: '',
      password: '',
      pa1:/^[a-zA-Z0-9]{2,10}$/,
      pa2: /^[a-zA-Z0-9]{4,10}$/,
      openLoading:false
      }
    },
    methods: {
     
      goBack () {
        console.log("goback");
        this.$router.go(-1)
      },
    axiosRegisterUser(){
      this.openLoading=true
        axios({
        url: url.registerUser,
        method: 'post',
        data:{
            userName:this.userName,
            password:this.password 
        }
    })
    .then(response => {
        console.log(response)
        //如果返回code为200，代表注册成功，我们给用户作Toast提示
        if(response.data.code == 200){
            Toast.success('注册成功')
            this.$router.push('/')
        }else{
            console.log(response.data.message)
            Toast.fail('注册失败')
            this.openLoading=false
        }
            console.log(response.data.code)
    })
    .catch( error => {   
        Toast.fail('注册失败')  
        console.log(error)
        this.openLoading=false
    })

}
    },
  }
</script>
 
<style scoped>

</style>