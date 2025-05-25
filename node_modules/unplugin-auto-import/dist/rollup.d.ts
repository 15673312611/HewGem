import * as rollup from 'rollup';
import { Options } from './types.js';
import '@antfu/utils';
import 'unimport';
import 'unplugin-utils';

declare const _default: (options: Options) => rollup.Plugin<any> | rollup.Plugin<any>[];

export { _default as default };
