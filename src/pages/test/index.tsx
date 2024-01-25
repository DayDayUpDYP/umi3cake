import { Button } from 'antd';
import { Link } from 'umi'
export default function IndexPage():any  {
  return (
    <div>
      <Link to="/">到达首页</Link>
      <Button type='primary'>测试页面</Button>
    </div>
  );
}
