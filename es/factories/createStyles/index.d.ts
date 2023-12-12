import { Context } from 'react';
import { Emotion } from "../../core";
import type { BaseReturnType, ClassNameGeneratorOption, HashPriority } from "../../types";
import { ReturnStyles, StyleOrGetStyleFn } from './types';
interface CreateStylesFactory {
    EmotionContext: Context<Emotion>;
    hashPriority?: HashPriority;
    useTheme: () => any;
}
export declare const createStylesFactory: ({ hashPriority, EmotionContext }: CreateStylesFactory) => <Props, Input extends BaseReturnType = BaseReturnType>(styleOrGetStyle: StyleOrGetStyleFn<Input, Props>, options?: ClassNameGeneratorOption) => (props?: Props | undefined) => ReturnStyles<Input>;
export {};
