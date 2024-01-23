import styles from './index.less'; 
import { Button } from 'antd';

export default function IndexPage():any  {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type='primary'>123</Button>
    </div>
  );
}
