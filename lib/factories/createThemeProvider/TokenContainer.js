"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = require("react");
var _core = require("../../core");
var _hooks = require("../../hooks");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["stylish"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TokenContainer = function TokenContainer(_ref) {
  var children = _ref.children,
    customTokenOrFn = _ref.customToken,
    defaultCustomTokenFn = _ref.defaultCustomToken,
    stylishOrGetStylish = _ref.customStylish,
    _ref$prefixCls = _ref.prefixCls,
    prefixCls = _ref$prefixCls === void 0 ? 'ant' : _ref$prefixCls,
    StyledThemeProvider = _ref.StyledThemeProvider;
  var themeState = (0, _hooks.useThemeMode)();
  var appearance = themeState.appearance,
    isDarkMode = themeState.isDarkMode;
  var _useAntdTheme = (0, _hooks.useAntdTheme)(),
    antdStylish = _useAntdTheme.stylish,
    token = (0, _objectWithoutProperties2.default)(_useAntdTheme, _excluded);

  // 获取默认的自定义 token
  var defaultCustomToken = (0, _react.useMemo)(function () {
    if (!defaultCustomTokenFn) return {};
    if (defaultCustomTokenFn instanceof Function) {
      return defaultCustomTokenFn({
        token: token,
        appearance: appearance,
        isDarkMode: isDarkMode
      });
    }
    return defaultCustomTokenFn;
  }, [defaultCustomTokenFn, token, appearance]);

  // 获取 自定义 token
  var customToken = (0, _react.useMemo)(function () {
    if (customTokenOrFn instanceof Function) {
      return _objectSpread(_objectSpread({}, defaultCustomToken), customTokenOrFn({
        token: token,
        appearance: appearance,
        isDarkMode: isDarkMode
      }));
    }
    return _objectSpread(_objectSpread({}, defaultCustomToken), customTokenOrFn);
  }, [defaultCustomToken, customTokenOrFn, token, appearance]);

  // 获取 stylish
  var customStylish = (0, _react.useMemo)(function () {
    if (!stylishOrGetStylish) return {};
    return stylishOrGetStylish({
      token: _objectSpread(_objectSpread({}, token), customToken),
      stylish: antdStylish,
      appearance: appearance,
      isDarkMode: isDarkMode,
      css: _core.serializeCSS
    });
  }, [stylishOrGetStylish, token, customToken, antdStylish, appearance]);
  var stylish = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, customStylish), antdStylish);
  }, [customStylish, antdStylish]);
  var theme = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, token), customToken), {}, {
    stylish: stylish
  }, themeState), {}, {
    prefixCls: prefixCls
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledThemeProvider, {
    theme: theme,
    children: children
  });
};
var _default = exports.default = TokenContainer;