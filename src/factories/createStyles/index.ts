import { Context, useContext } from 'react';
import { Emotion, createCSS, serializeCSS } from '@/core';
import type {
  BaseReturnType,
  ClassNameGeneratorOption,
  HashPriority,
  ResponsiveUtil,
} from '@/types';
import { isReactCssResult, classnames } from '@/utils';

import { FasterAntdStyleContext } from './FasterAntdStyleProvider';
import { convertResponsiveStyleToString } from './response';
import { ReturnStyles, StyleOrGetStyleFn } from './types';

interface CreateStylesFactory {
  EmotionContext: Context<Emotion>;
  hashPriority?: HashPriority;
  useTheme: () => any;
}

const fastCx = (...args: any) => classnames(args);

const generateStyles = (
  { props, theme, styleOrGetStyle, responsiveMap, cx, toClassName }: any
) => {
  const styles = (() => {
    let tempStyles

    if (styleOrGetStyle instanceof Function) {
      const { stylish, appearance, isDarkMode, prefixCls, ...token } = theme;

      // @ts-ignore
      const responsive: ResponsiveUtil = (styles) =>
        convertResponsiveStyleToString(styles, responsiveMap);
      Object.assign(responsive, responsiveMap);

      tempStyles = styleOrGetStyle(
        {
          token,
          stylish,
          appearance,
          isDarkMode,
          prefixCls,
          cx,
          css: serializeCSS,
          responsive,
        },
        props!,
      ) as any;
    } else {
      tempStyles = styleOrGetStyle as any;
    }

    if (typeof tempStyles === 'object') {
      if (isReactCssResult(tempStyles)) {
        tempStyles = toClassName(tempStyles) as any;
      } else {
        tempStyles = Object.fromEntries(
          Object.entries(tempStyles).map(([key, value]) => {
            if (typeof value === 'object') {
              return [key, toClassName(value) as any];
            }
            return [key, value];
          }),
        ) as any;
      }
    }

    return tempStyles;
  })()

  const { prefixCls, ...res } = theme;
  return { styles, cx, theme: res, prefixCls, fastCx };
}

let createStylesCallsCounter = 0

export const createStylesFactory =
  ({ hashPriority, EmotionContext }: CreateStylesFactory) =>
  <Props, Input extends BaseReturnType = BaseReturnType>(
    styleOrGetStyle: StyleOrGetStyleFn<Input, Props>,
    options?: ClassNameGeneratorOption,
  ) => {
    const globalBaseCacheKey = createStylesCallsCounter++;

    return (props?: Props): ReturnStyles<Input> => {
      const globalCacheKey = `${globalBaseCacheKey}-${JSON.stringify(props)}`

      const fasterAntdStyleContext = useContext(FasterAntdStyleContext)
      const { theme, responsiveMap } = fasterAntdStyleContext;

      const { cache } = useContext(EmotionContext);

      const { cx, css: toClassName } = createCSS(cache, {
        hashPriority: options?.hashPriority || hashPriority,
        label: options?.label,
      });

      if (!fasterAntdStyleContext.cache[globalCacheKey]) {
        const styles = generateStyles({ props, theme, styleOrGetStyle, responsiveMap, cx, toClassName });
        fasterAntdStyleContext.cache[globalCacheKey] = styles;
      }
      const result = fasterAntdStyleContext.cache[globalCacheKey];

      return result
    };
  };
