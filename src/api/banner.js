import { request } from 'umi';

export const bannerAdd = (bannerObj) => {
  // 新增轮播
  return request('/classes/cakeBanner', {
    method: 'POST',
    data: bannerObj,
  });
};

// 获取 banner 列表
export const bannerGet = () => {
  return request('/classes/cakeBanner', {
    method: 'GET',
  });
};

// 更新 banner 列表
export const bannerUpdate = (objectId, bannerObj) => {
  return request(`/classes/cakeBanner/${objectId}`, {
    method: 'PUT',
    data: bannerObj,
  });
};

// 删除 banner 某列
export const bannerDelete = (objectId) => {
  return request(`/classes/cakeBanner/${objectId}`, {
    method: 'DELETE',
  });
};
