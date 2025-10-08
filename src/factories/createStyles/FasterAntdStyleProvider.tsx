import React, { type Context, type ReactNode } from 'react';
import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs';
import { useTheme } from '@/functions';
import { useMediaQueryMap } from './response'

export const FasterAntdStyleContext: Context<{
  cache?: any,
  theme?: any,
  responsiveMap?: any
}> = React.createContext({});

export interface FasterAntdStyleProviderProps {
  children: ReactNode;
  /** Wrap css in a layer to avoid global style conflict */
  layer?: boolean;
}

export const FasterAntdStyleProvider = ({ children, layer }: FasterAntdStyleProviderProps) => {
  const theme = useTheme();
  const responsiveMap = useMediaQueryMap();

  const contextValue = {
    cache: {},
    theme,
    responsiveMap
  };

  (window as any).FasterAntdStyleWorkaround = { contextValue }

  const content = (
    <FasterAntdStyleContext.Provider value={contextValue}>
      {children}
    </FasterAntdStyleContext.Provider>
  );

  if (layer) {
    return <AntdStyleProvider layer={layer}>{content}</AntdStyleProvider>;
  }

  return content;
}
