# FasterAntdStyleProvider with Layer Support

The `FasterAntdStyleProvider` now supports the `layer` prop to wrap CSS in a CSS layer to avoid global style conflicts when using with third-party style libraries like Tailwind CSS, Styled-components, or Emotion.

## Usage

### Basic Usage (without layer)

```tsx
import { FasterAntdStyleProvider } from 'antd-style';

const App = () => {
  return (
    <FasterAntdStyleProvider>
      <YourComponents />
    </FasterAntdStyleProvider>
  );
};
```

### With Layer Support

When you need to integrate with third-party CSS libraries, you can enable the `layer` prop:

```tsx
import { FasterAntdStyleProvider } from 'antd-style';

const App = () => {
  return (
    <FasterAntdStyleProvider layer>
      <YourComponents />
    </FasterAntdStyleProvider>
  );
};
```

### With Layer Support (explicit boolean)

```tsx
import { FasterAntdStyleProvider } from 'antd-style';

const App = () => {
  return (
    <FasterAntdStyleProvider layer={true}>
      <YourComponents />
    </FasterAntdStyleProvider>
  );
};
```

## Props

### FasterAntdStyleProviderProps

| Property | Type      | Default | Description                                             |
| -------- | --------- | ------- | ------------------------------------------------------- |
| children | ReactNode | -       | Child components                                        |
| layer    | boolean   | false   | Wrap CSS in a CSS layer to avoid global style conflicts |

## Background

This feature is based on Ant Design's CSS compatible layer feature. See the [official documentation](https://ant.design/docs/react/compatible-style) for more information about CSS layer compatibility with third-party style libraries.

When `layer` is enabled, the component internally wraps children with `@ant-design/cssinjs`'s `StyleProvider` with the `layer` prop, which helps manage CSS ordering priority among different libraries.
