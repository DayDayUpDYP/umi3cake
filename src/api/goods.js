import { request } from 'umi';

export const goodsAdd = (goodsObj) => {
  // 新增分类
  return request('/classes/cakeGoods', {
    method: 'POST',
    data: goodsObj,
  });
};
