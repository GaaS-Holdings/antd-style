import { type Context, type ReactNode } from 'react';
export declare const FasterAntdStyleContext: Context<{
    cache?: any;
    theme?: any;
    responsiveMap?: any;
}>;
export interface FasterAntdStyleProviderProps {
    children: ReactNode;
    /** Wrap css in a layer to avoid global style conflict */
    layer?: boolean;
}
export declare const FasterAntdStyleProvider: ({ children, layer }: FasterAntdStyleProviderProps) => import("react/jsx-runtime").JSX.Element;
