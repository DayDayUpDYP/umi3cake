import { request } from 'umi';

export const cateAdd = (cateObj) => {
  // 新增分类
  return request('/classes/cakeCate', {
    method: 'POST',
    data: cateObj,
  });
};
export const cateGet = () => {
  //分类列表
  return request('/classes/cakeCate', {
    method: 'GET',
  });
};
