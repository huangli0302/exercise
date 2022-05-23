import http from '@/apiConfig/http';
export const getList=(data:any,method:any)=>{
  return http({
    url:"api/list",
    params:data,
    method:method
  })
}
export const addList=(data:any,method:any)=>{
  return http({
    url:method==="post"?`api/list`:`api/list/${data.id}`,
    data,
    method:method
  })
}
export const deleteList=(data:any)=>{
  return http({
    url:`api/list/${data.key}`,
    data,
    method:"delete"
  })
}