"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkW4BJKNF7cjs = require('./chunk-W4BJKNF7.cjs');
require('./chunk-6BSQ6ZKC.cjs');

// src/nuxt.ts
var _kit = require('@nuxt/kit');
var nuxt_default = _kit.defineNuxtModule.call(void 0, {
  setup(options) {
    options.exclude = options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/];
    _kit.addWebpackPlugin.call(void 0, _chunkW4BJKNF7cjs.unplugin_default.webpack(options));
    _kit.addVitePlugin.call(void 0, _chunkW4BJKNF7cjs.unplugin_default.vite(options));
  }
});


exports.default = nuxt_default;
