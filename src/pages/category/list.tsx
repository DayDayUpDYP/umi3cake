import React,{useState, useEffect} from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';
import { stuGet,stuDel } from '@/api/stu';

interface DataType {
  id:string,
  name: string;
  score: number;
  city: string;
  time: string;
}

const columns: TableProps<DataType>['columns'] = [
  
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">编辑</Button>
        <Button type="primary" danger onClick={() => {stuDel(record.id).then()}}>删除</Button>
      </Space>
    ),
  },
];

export default function StuList(){
  // 这里可以写usestate等
  let [data,setData] =useState([]);
  useEffect(() => {
    stuGet().then((res: any) => {
      console.log(res);
      setData(res.data)
    })
  },[]);
  return(
    <Table columns={columns} dataSource={data} rowKey={record => record.name} />
  )
};