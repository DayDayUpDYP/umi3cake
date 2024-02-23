import { request } from 'umi';

export const goodsAdd = (goodsObj) => {
  // 新增分类
  return request('/classes/cakeGoods', {
    method: 'POST',
    data: goodsObj,
  });
};
export const goodsExchange = (cakelist, values) => {
  let batchObj = { requests: [] };
  cakelist.forEach((item) => {
    batchObj.requests.push({
      method: 'POST',
      path: '/1.1/classes/cakeGoods',
      body: { ...item, ...values },
    });
  });
  return request('/batch', {
    method: 'POST',
    data: batchObj,
  });
};
