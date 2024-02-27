import { Menu, Dropdown, Space, Badge } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
// import {connect} from 'umi'
// import notice from '../../models/notice';

const HeaderDropMenu = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  function handleMenuClick({ key }) {
    if (key === '2') {
      //用户退出
      // 1.清除用户信息
      // 2。路由跳转
      // 清除initailState
      setInitialState({ isLogin: false, userInfo: null });
      // 清除本地存储
      localStorage.removeItem('userInfo');
      sessionStorage.removeItem('userInfo');
      // 路由跳转
      history.push('/login');
    }
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '个人设置',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '退出登陆',
          key: '2',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );
  return (
    <Space wrap>
      <Dropdown.Button overlay={menu}>
        {initialState.userInfo?.username}
        {/* {
      props.notice.list.filter((item)=>{
        return !item.read
      }).length
    } */}
      </Dropdown.Button>
    </Space>
  );
};

// export default connect(({notice})=>({notice}))(HeaderDropMenu)
export default HeaderDropMenu;
