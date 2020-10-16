import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.mixin({
  methods:{
    // axios 通信方法
    $post(url, param){
     return axios.post(url, qs.stringify(param))
    },
    $get(url, param){
      return axios.get(url,qs.stringify({param}))
    }
  }
})
