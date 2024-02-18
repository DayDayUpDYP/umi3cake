import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import Cloud from 'leancloud-storage';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const App: React.FC = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // 自定义图片提交方法
// const customUpload = (info:any) =>{
//   setLoading(true);
//   console.log(info)
// }
const customUpload= (info:any) => {
  setLoading(true);
  // Get this url from response in real world.
  getBase64(info.file , (base64) => {
    console.log('base64的url==>', base64);
    const file = new Cloud.File('cakeImg.png',{base64}); // 将本地资源转换为可以向 leancloud 提交的在线资源
    // leancloud 文件保存的方法
    file.save().then( res =>{
      // console.log(res)
      // console.log(res.attributes.url)
      console.log('props',props);
      props.onChange(res.attributes.url);
      setLoading(false);
      setImageUrl(res.attributes.url); //本地预览在线的图片
    })
  });
};

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customUpload}
        beforeUpload={beforeUpload}
        // onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  );
};

export default App;