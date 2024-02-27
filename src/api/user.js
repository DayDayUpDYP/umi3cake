import { request } from 'umi';
export const userLogin = (user) => {
  //登录
  return request('/login', {
    method: 'POST',
    data: user,
  });
};
// 账号分配，此处的 user 会携带 role 角色
export const userReg = (user) => {
  return request('/users', {
    method: 'POST',
    data: user,
  });
};
export const roleAdd = (roleObj) => {
  // 角色新增
  return request('/classes/cakeRole', {
    method: 'POST',
    data: roleObj,
  });
};
// 得到用户
export const roleGet = () => {
  // 角色新增
  return request('/classes/cakeRole', {
    method: 'GET',
  });
};
