import http from '@/apiConfig/http';
export const login=(data:any)=>{
  return http({
    url:'api/login',
    params:data,
    method:'get'
  })
}
export const logout=()=>{
  return http({
    url:'api/logout',
    method:'post'
  })
}