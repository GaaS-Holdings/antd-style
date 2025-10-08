import { type Context, type ReactNode } from 'react';
import type { HashPriority } from '../../types';
export declare const FasterAntdStyleContext: Context<{
    cache?: any;
    theme?: any;
    responsiveMap?: any;
}>;
export interface FasterAntdStyleProviderProps {
    children: ReactNode;
    /** Wrap css in a layer to avoid global style conflict */
    layer?: boolean;
    /** Use `:where` selector to reduce hashId css selector priority */
    hashPriority?: HashPriority;
}
export declare const FasterAntdStyleProvider: ({ children, layer, hashPriority }: FasterAntdStyleProviderProps) => import("react/jsx-runtime").JSX.Element;
