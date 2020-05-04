const Koa = require('Koa')
const app = new Koa()
//引入connect
const {connect,initSchemas} = require('./database/init.js')
// const mongoose = require('mongoose')
// 路由模块化
const Router = require('koa-router')
// 接到前端发过来的请求中间件
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
app.use(bodyParser());
// 解决跨域中间件
app.use(cors())

// 引入接口模块
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
// 装载所有子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/goods',goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
// 立即执行函数
;(async () =>{
  await connect()
  initSchemas()
})()
 //async 函数是什么？一句话，它就是 Generator 函数的语法糖
  // async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

app.use(async ctx=>{ 
  ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000,()=>{
  console.log('[Server] starting at port 3000')
}) 


