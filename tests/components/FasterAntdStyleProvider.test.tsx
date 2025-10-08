import { render } from '@testing-library/react';
import { FasterAntdStyleProvider, ThemeProvider } from 'antd-style';
import { describe, expect, it } from 'vitest';

describe('FasterAntdStyleProvider', () => {
  it('should render children without layer prop', () => {
    const { container } = render(
      <ThemeProvider>
        <FasterAntdStyleProvider>
          <div data-testid="test-child">Test Content</div>
        </FasterAntdStyleProvider>
      </ThemeProvider>,
    );

    expect(container.querySelector('[data-testid="test-child"]')).toBeTruthy();
  });

  it('should render children with layer prop enabled', () => {
    const { container } = render(
      <ThemeProvider>
        <FasterAntdStyleProvider layer>
          <div data-testid="test-child">Test Content</div>
        </FasterAntdStyleProvider>
      </ThemeProvider>,
    );

    expect(container.querySelector('[data-testid="test-child"]')).toBeTruthy();
  });

  it('should accept layer prop as boolean', () => {
    const { container: containerTrue } = render(
      <ThemeProvider>
        <FasterAntdStyleProvider layer={true}>
          <div data-testid="test-child-true">Test Content</div>
        </FasterAntdStyleProvider>
      </ThemeProvider>,
    );

    const { container: containerFalse } = render(
      <ThemeProvider>
        <FasterAntdStyleProvider layer={false}>
          <div data-testid="test-child-false">Test Content</div>
        </FasterAntdStyleProvider>
      </ThemeProvider>,
    );

    expect(containerTrue.querySelector('[data-testid="test-child-true"]')).toBeTruthy();
    expect(containerFalse.querySelector('[data-testid="test-child-false"]')).toBeTruthy();
  });
});
