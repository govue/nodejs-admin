import axios from 'axios';
import {Loading, Message} from 'element-ui';
import router from './router';

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

//请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading()

  // 如果有eleToken
  if (localStorage.eleToken) {
    // 设置统一的请求header
    config.headers.Authorization = localStorage.eleToken
  }


  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response => {
  endLoading()
  return response
}, error => {
  endLoading()
  // 错误提醒
  Message.error(error.response.data)

  // 获取错误状态码
  const {status} = error.response
  if (status === 401) { // 401为服务器token过期错误代码
    Message.error('token失效，请重新登录！')
    localStorage.removeItem('eleToken') // 清除eleToken
    router.push('/login')
  }

  return Promise.reject(error)
})

export default axios
