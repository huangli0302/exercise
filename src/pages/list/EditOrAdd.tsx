import React, { useState,useImperativeHandle, forwardRef} from 'react';
import { Modal, Button,Form, Input } from 'antd';
import {addList} from '@/api/list';
 function EditOrAdd(props: any,ref:any) {
  const {type,closeModel,isModalVisible,onRefresh,item}=props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [value,setValues]=useState({});//初始化from的值
  useImperativeHandle(ref, () => ({
    initFromData
  }))//实现父组件可调用子组件的方法
  const initFromData=()=>{
    if(type==='edit'){
      console.log(type,item,123,props);
      let values = JSON.parse(JSON.stringify(item));
      setValues(values);
      form.setFieldsValue({ 
      "projectName":values.projectName,
      "projectDetail":values.projectDetail });
    }else if(type==='add'){
      form.setFieldsValue({ 
        "projectName":"",
        "projectDetail":"" });
    }
  }
  const handleOk = () => {
    form.validateFields().then(res=>{
      let uuid = new Date().getTime() + Math.random().toString(36).substr(2);
      setConfirmLoading(true);
      let method:String=type==="add"?"post":"put";
      let params:Object=type==="add"?{...res,"key":uuid,"id":uuid}:{...value,...res};
      addList(params,method).then((res:any)=>{
        form.resetFields();
        setConfirmLoading(false);
        closeModel(type);
        onRefresh();
      })
      console.log(res,uuid);
      //给后端发请求
      
    },err=>{
      console.log(err);
    })  
    //closeModel(type);
  }
  const handleCancel = () => {
    form.resetFields();
    closeModel(type);
  }
  
  return (
    <>
      <Modal 
      title={type==="edit"?"编辑项目":"创建项目"}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel} 
      confirmLoading={confirmLoading}
      cancelText="取消" okText="确定">
      <Form 
        form={form}  
        name="userForm" 
       >
        <Form.Item
          name="projectName"
          label="项目名称"
          rules={[
            {
              required: true,
              message: '项目名称必填' 
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="projectDetail"
          label="项目描述"
        >
          <Input.TextArea showCount maxLength={100}/>
        </Form.Item>
      </Form>
      </Modal>
    </>
  )
}
export default forwardRef(EditOrAdd)
