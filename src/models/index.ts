
const model: any = {
  namespace: 'user',
  //数据
  state: {
    username: 'jack',
  },
  //异步修改数据
  effects: {
    
  },
  //同步修改数据
  reducers: {
    saveName(state = { username: '' }, { payload }:any): any {  // state是当前状态的值，如果未被修改过，那么state为空，默认值为{ name: '' }。  payload 是调用dispatch时传过来的值。
      return {
        ...state,
        username: payload.username  //请求到的数据
      };
    }
  },
};

export default model;