import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    inputValue:'aaa',
    nextId:'5',
    viewKey:'all'
  },
  mutations: {
    initList(state,list){
      state.list=list
    },
    changeValue (state,newValue) {
      state.inputValue=newValue
      console.log(newValue)
    },
    addList(state) {
      const obj ={
        id: state.nextId,
        info: state.inputValue.trim(),
       
      }
      state.list.push(obj)
      state.nextId++  
      state.inputValue=''
    },
    deleList(state,id) {
      //根据id找到索引
      const i = state.list.findIndex(item => item.id===id)
      console.log(i)
      i !== -1 && state.list.splice(i,1)
    },
    changeCheck(state,param) {
      const i = state.list.findIndex(item => item.id===param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      } 
    },
    clearChecked (state){
      state.list=state.list.filter(item => item.done===false)
    },
    
    // 修改视图的关键字
    changeType(state, key) {
      state.viewKey = key
    }
  },
  actions: {
   getList (context) {
     axios.get('/list.json').then(response => {
       console.log(response)
       context.commit('initList',response.data)
     }).catch(err=>{
       console.log(err)
     })
   }
  },
  getters: {
    // 统计未完成的任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
