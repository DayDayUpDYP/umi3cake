import React, { useState, useEffect } from 'react';
import { cateGet } from '@/api/cake';
import { goodsAdd, goodsExchange } from '@/api/goods';
import { Form, Input, Button, Spin, Select } from 'antd';
import { useRequest } from 'umi';
import Cloud from 'leancloud-storage';
import axios from 'axios';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
function getBase64(img, callback) {
  //将本地资源对象，转换为base64编码
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const GoodsPub = () => {
  const [form] = Form.useForm();

  let { data, loading } = useRequest(cateGet);

  const [editor, setEditor] = useState(null);
  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>');
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>');
    }, 1500);
  }, []);
  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...',
    // 初始化他
    MENU_CONF: {},
  };
  editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    async customUpload(file, insertFn) {
      // 图片先转换为 base64再存储
      getBase64(file, (base64) => {
        //将本地资源对象，转换为base64编码
        const file = new Cloud.File('goodsimg.png', { base64 }); //将本地资源转化为一个可以向leancloud平台提交的资源
        file.save().then((res) => {
          //上传图片资源
          let { url } = res.attributes;
          // 本地展示
          insertFn(url);
        });
      });
    },
  };
  // 工具栏配置
  const toolbarConfig = {};
  //排除菜单
  toolbarConfig.excludeKeys = [
    'uploadVideo', // 排除菜单组，写菜单组 key 的值即可
    'headerSelect',
    'italic',
    'group-more-style',
    'todo',
    'emotion',
    'codeSelectLang',
  ];
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  const onSubmit = () => {
    console.log('html', html);
  };
  const onFinish = (values) => {
    console.log(values);
    // 拿到目标平台的数据包
    let url =
      'http://localhost:3000/cake/api/0434b49d1ac28f9d?cityId=110&page=2&bid=5';
    axios({
      url,
      method: 'get',
      headers: {
        'access-token': '0f0eba9c9171ce567434c295b2477fd8', //如果token失效，可以重新从目标网站接口获取新的token
        version: 'v1.0',
      },
    }).then((res) => {
      console.log(res);
      goodsExchange(res.data.data.list, values);
    });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="goodsEdit" onFinish={onFinish}>
        <Form.Item
          name="cateId"
          label="分类选择"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* react 中的 循环的写法 是原生的 */}
          <Select placeholder="请选择商品分类">
            {data?.map((item) => {
              return (
                <Option value={item.objectId} key={item.objectId}>
                  {item.catename}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="cateEdit" label="分类富文本编辑">
          <div>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => {
                setHtml(editor.getHtml());
                form.setFieldsValue({ cateEdit: editor.getHtml() }); // 更新 cateEdit 字段的值
              }}
              mode="default"
              style={{ height: '500px', overflowY: 'hidden' }}
            />
          </div>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
          <Button type="dashed" htmlType="submit">
            批量转存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPub;
