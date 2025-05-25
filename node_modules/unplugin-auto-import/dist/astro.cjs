"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkW4BJKNF7cjs = require('./chunk-W4BJKNF7.cjs');
require('./chunk-6BSQ6ZKC.cjs');

// src/astro.ts
function astro_default(options) {
  return {
    name: "unplugin-auto-import",
    hooks: {
      "astro:config:setup": async (astro) => {
        var _a;
        (_a = astro.config.vite).plugins || (_a.plugins = []);
        astro.config.vite.plugins.push(_chunkW4BJKNF7cjs.unplugin_default.vite(options));
      }
    }
  };
}


exports.default = astro_default;
