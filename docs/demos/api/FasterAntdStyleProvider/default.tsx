/**
 * title: FasterAntdStyleProvider without Layer
 * description: Basic usage of FasterAntdStyleProvider without the layer prop
 */

import { Button, Space } from 'antd';
import { FasterAntdStyleProvider, ThemeProvider, createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    background: ${token.colorBgLayout};
    border-radius: ${token.borderRadius}px;
  `,
  button: css`
    margin: 8px;
  `,
}));

const DemoComponent = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <div>
          <h3>FasterAntdStyleProvider Basic Usage</h3>
          <p>
            This example demonstrates the basic usage of FasterAntdStyleProvider without any layer
            prop. This is the default behavior.
          </p>
        </div>
        <Button type="primary" className={styles.button}>
          Primary Button
        </Button>
        <Button className={styles.button}>Default Button</Button>
      </Space>
    </div>
  );
};

export default () => {
  return (
    <ThemeProvider>
      <FasterAntdStyleProvider>
        <DemoComponent />
      </FasterAntdStyleProvider>
    </ThemeProvider>
  );
};
