"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractStaticStyle = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _antd = require("antd");
var _jsxRuntime = require("react/jsx-runtime");
var createExtractCriticalWithoutHtml = function createExtractCriticalWithoutHtml(cache) {
  return {
    ids: Object.keys(cache.inserted),
    css: Object.values(cache.inserted).filter(function (i) {
      return typeof i === 'string';
    }).join('')
  };
};

/**
 * 表示一个样式项
 */

var defaultAntdCache = (0, _cssinjs.createCache)();
/**
 * Extract Static style
 * @param html html page string
 * @param options
 */
var extractStaticStyle = exports.extractStaticStyle = function extractStaticStyle(html, options) {
  var _options$antdCache;
  var shouldExtreactAntdStyle = typeof (options === null || options === void 0 ? void 0 : options.includeAntd) !== 'undefined' ? options.includeAntd : true;
  var cache = (_options$antdCache = options === null || options === void 0 ? void 0 : options.antdCache) !== null && _options$antdCache !== void 0 ? _options$antdCache : defaultAntdCache;
  var styleText = (0, _cssinjs.extractStyle)(cache);
  var antdCssString = styleText.replace(/<style\s[^>]*>/g, '').replace(/<\/style>/g, '');
  var antdStyle = {
    style: /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      "data-antd-version": _antd.version,
      dangerouslySetInnerHTML: {
        __html: antdCssString
      }
    }, 'antd'),
    ids: Array.from(cache.cache.keys()),
    key: 'antd',
    css: antdCssString,
    tag: "<style data-antd-version=\"".concat(_antd.version, "\">").concat(antdCssString, "</style>")
  };

  // copy from emotion ssr
  // https://github.com/vercel/next.js/blob/deprecated-main/examples/with-emotion-vanilla/pages/_document.js
  var styles = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map(function (cache) {
    var createEmotionServer = require('@emotion/server/create-instance').default;
    var result = !html ? createExtractCriticalWithoutHtml(cache) : createEmotionServer(cache).extractCritical(html);
    if (!result.css) return null;
    var css = result.css,
      ids = result.ids;
    return {
      key: cache.key,
      style: /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
        "data-emotion": "".concat(cache.key, " ").concat(ids.join(' ')),
        dangerouslySetInnerHTML: {
          __html: css
        }
      }, cache.key),
      css: css,
      ids: ids,
      tag: "<style data-emotion=\"".concat(cache.key, " ").concat(result.ids.join(' '), "\">").concat(result.css, "</style>")
    };
  });

  // 只有当有 antd 的 css ，且需要抽取 antd 样式时，才抽取 antd 样式
  if (!!antdCssString && shouldExtreactAntdStyle) {
    styles.unshift(antdStyle);
  }
  return styles.filter(Boolean);
};
extractStaticStyle.cache = defaultAntdCache;