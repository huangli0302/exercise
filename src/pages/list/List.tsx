import React,{useEffect,useRef,useState}from 'react'
import { Table,Space,Button,Input,Popconfirm} from 'antd';
import {getList,deleteList} from '@/api/list';
import {DeleteOutlined,FormOutlined,PlusOutlined,RedoOutlined} from '@ant-design/icons';
import "./list.less";
import EditOrAdd from "./EditOrAdd"
interface columnType{
  title:String,
  key:String,
  fixed?:String,
  width?:Number|String,
  dataIndex?:String,
  render?:Function
}
const { Search } = Input;
export default function List() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoding] = useState(true);
  const [isModalVisible,setIsModalVisible]=useState(false);
  const [type,setType]= useState("add");
  const [item,setItem]=useState({});
  const editOrAddRef:any = useRef();
  useEffect(() => {
    getListHandle();
  },[]);
  const columns:Array<any> = [
    {
      title:"项目名称",
      key:"projectName",
      dataIndex: 'projectName',
    },
    {
      title:"项目描述",
      key:"projectDetail",
      dataIndex: 'projectDetail',
    },
    {
      title: "操作",
      width: 200,
      fixed: "right",
      key:'opt',
      render:(_: any, record:any)=>{
        return(
        <div>
          <FormOutlined style={{color:"#1890ff",fontSize:"20px"}} onClick={()=>{editHandle(record)}}/>
          &emsp;
          <Popconfirm title="确定要删除?" onConfirm={() => handleDelete(record.key)} okText="确定" cancelText="取消">
            <DeleteOutlined style={{fontSize:"20px"}} />
          </Popconfirm>
          
        </div>)
      }
    },
  ];
  const editHandle=(item:any)=>{
    setType("edit");
    setItem(item);
    setIsModalVisible(true);
    setTimeout(()=>{editOrAddRef.current.initFromData();});
    
  }
  const getListHandle=async (data?:any)=>{
    setLoding(true);
    let res = await getList(data,'get');
    setLoding(false);
    setData(res);
  }
  const onSearch=(value:any)=>{
    console.log(value);
    getListHandle({projectName:value});
  }
  const onRefresh=(type?:String)=>{
    type==='herit'?getListHandle():getListHandle({searchText});
    if(type!=="herit"){
      return;
    }
    setSearchText("");
  }
  const handleDelete=(key:String|Number)=> {
    //const newData = data.filter((item:any) => item.key !== key);
    deleteList({"key":key}).then((res:any)=>{
      onRefresh("herit");
    });
    //setData(newData);
  }
  const onChange=(event:any)=>{
    setSearchText(event.target.value);
  }
  const addHanlde=()=>{
    setIsModalVisible(true);
  }
  const cancelType = (type:any)=>{
      if(type==="add"){
        setIsModalVisible(false);
    }else if(type==="edit"){
      setIsModalVisible(false);
    }
  }
  return (
    <div className='list-container'>
      <div className='search'>
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={addHanlde}>新增</Button>
        <Button type="primary" icon={<RedoOutlined />} onClick={()=>{onRefresh}}>刷新</Button>
        <span>项目名称：</span>
        <Search placeholder="输入关键字" onSearch={onSearch} onChange={onChange} style={{ width: 200 }} value={searchText}/>
      </Space>
      </div>
      <div className='table'>
        <Table columns={columns} dataSource={data} loading={loading}  bordered>
        </Table>
      </div>
      <EditOrAdd ref={editOrAddRef} isModalVisible={isModalVisible} closeModel={cancelType} type={type} onRefresh={onRefresh} item={item}></EditOrAdd>
    </div>
  )
}
