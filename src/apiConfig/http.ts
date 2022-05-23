import axios from 'axios'

// 基本配置

const instance:any= axios.create({
    timeout: 1000, 
    proxy: {    // 'proxy' 定义代理服务器的主机名称和端口
    host: 'localhost',
    port: 3000,
  },
});
if (localStorage.getItem("token")) {
  instance.defaults.headers.common["Authorization"] = "Bearer"+localStorage.getItem("token");
}
instance.interceptors.request.use(function (config:any) {
  return config;
}, function (error:any) {
  return Promise.reject(error);
});
 
instance.interceptors.response.use(function (response:any) {
  if(response.status===200){
    return response.data;
  }else{
    return response;//后期处理这里应该是一个函数  
  }
}, function (error:any) {
  return Promise.reject(error);
});
export default instance;