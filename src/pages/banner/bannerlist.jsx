import React from 'react';
import { Table, Space, Button, Image } from 'antd';
import { bannerGet, bannerDelete } from '@/api/banner';
import { useRequest, history } from 'umi';

export default function BannerList() {
  // 删除接口调用和 loading
  // let {dataa,loading,run} = useRequest((objectId) =>{
  //   return bannerDelete(objectId)
  // },{manual:true})
  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '轮播名称',
      dataIndex: 'bannerName',
      key: 'bannerName',
    },
    {
      title: '轮播地址',
      dataIndex: 'bannerUrl',
      key: 'bannerUrl',
      render: (url) => (
        <a href={url} target="_blank">
          点击预览
        </a>
      ),
    },
    {
      title: '轮播封面',
      dataIndex: 'bannerimgUrl',
      key: 'bannerimgUrl',
      render: (url) => <Image src={url} height={50} />,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              history.push({
                pathname: '/banner/banneredit',
                query: record,
              });
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              bannerDelete(record.objectId);
            }}
            danger
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 获取轮播数据
  const { data, loading, error } = useRequest(bannerGet);
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey="objectId"
    />
  );
}
