export default function (initialState: any) {
  // const { role } = initialState;
  let { role } = initialState.userInfo ? initialState.userInfo : { role: '' };
  return {
    isRoot: role === 'root', //只有超级管理员能看到
    isAdmin: role === 'root' || role === 'admin',
    isWorker: true,
  };
}
