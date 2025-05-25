import {
  unplugin_default
} from "./chunk-NY5XDZK3.js";
import "./chunk-AXRVJ5GF.js";
import "./chunk-QGM4M3NI.js";
import "./chunk-6F4PWJZI.js";

// src/nuxt.ts
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
var nuxt_default = defineNuxtModule({
  setup(options) {
    addWebpackPlugin(unplugin_default.webpack(options));
    addVitePlugin(unplugin_default.vite(options));
  }
});
export {
  nuxt_default as default
};
