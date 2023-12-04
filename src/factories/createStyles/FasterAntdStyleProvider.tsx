import React, { type Context, type ReactNode } from 'react';
import { useTheme } from '@/functions';
import { useMediaQueryMap } from './response'

export const FasterAntdStyleContext: Context<{
  cache?: any,
  theme?: any,
  responsiveMap?: any
}> = React.createContext({});

export const FasterAntdStyleProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const responsiveMap = useMediaQueryMap()

  const contextValue = {
    cache: {},
    theme,
    responsiveMap
  }

  return (
    <FasterAntdStyleContext.Provider value={contextValue}>
      {children}
    </FasterAntdStyleContext.Provider>
  )
}
