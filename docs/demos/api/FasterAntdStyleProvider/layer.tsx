/**
 * title: FasterAntdStyleProvider with Layer Support
 * description: Demonstrates the usage of FasterAntdStyleProvider with the layer prop to avoid CSS conflicts with third-party libraries
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
          <h3>FasterAntdStyleProvider with Layer Support</h3>
          <p>
            This example demonstrates the FasterAntdStyleProvider with the <code>layer</code> prop
            enabled, which wraps styles in a CSS layer to prevent conflicts with third-party CSS
            libraries.
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
      <FasterAntdStyleProvider layer>
        <DemoComponent />
      </FasterAntdStyleProvider>
    </ThemeProvider>
  );
};
