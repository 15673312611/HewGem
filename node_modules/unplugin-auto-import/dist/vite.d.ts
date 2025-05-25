import * as vite from 'vite';
import { Options } from './types.js';
import '@antfu/utils';
import 'unimport';
import 'unplugin-utils';

declare const _default: (options: Options) => vite.Plugin<any> | vite.Plugin<any>[];

export { _default as default };
