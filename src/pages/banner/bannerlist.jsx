import React from 'react'
import { Table,Space,Button,Image } from 'antd';
// import {cateGet} from '@/api/cake'
import {useRequest,history,useAccess} from 'umi'

export default function BannerList() {
  console.log('banner列表权限信息',access);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: text => <a>{text}</a>,
    },
    {
      title: '分类名称',
      dataIndex: 'catename',
      key: 'catename',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record,index) => (
        <Space size="middle">
          <Button type="primary" size='small' disabled={!access.isRoot} onClick={()=>{
            history.push({
              pathname:'/banner/edit',
              query:record
            })
          }}>编辑</Button>
          <Button type="primary" size='small' danger>删除</Button>
        </Space>
      ),
    },
  ];
  
  // const {data,loading,error} = useRequest(cateGet)
  return (
    <Table 
      loading={loading} 
      columns={columns} 
      dataSource={data} 
      rowKey="objectId"
    />
  )
}

