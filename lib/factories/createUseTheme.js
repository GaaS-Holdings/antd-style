"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseTheme = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = require("react");
var _setupStyled = require("../functions/setupStyled");
var _useAntdTheme = require("../hooks/useAntdTheme");
var _useThemeMode = require("../hooks/useThemeMode");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createUseTheme = exports.createUseTheme = function createUseTheme(options) {
  return function () {
    var StyleEngineContext = options.StyleEngineContext;
    var _useContext = (0, _react.useContext)(StyleEngineContext),
      StyledThemeContext = _useContext.StyledThemeContext,
      CustomThemeContext = _useContext.CustomThemeContext,
      prefixCls = _useContext.prefixCls;
    var antdTheme = (0, _useAntdTheme.useAntdTheme)();
    var themeState = (0, _useThemeMode.useThemeMode)();
    var defaultCustomTheme = (0, _react.useContext)(CustomThemeContext);
    var styledTheme = (0, _react.useContext)(StyledThemeContext !== null && StyledThemeContext !== void 0 ? StyledThemeContext : _setupStyled.DEFAULT_THEME_CONTEXT) || {};
    var initTheme = (0, _react.useMemo)(function () {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, antdTheme), themeState), defaultCustomTheme), {}, {
        prefixCls: prefixCls || 'ant'
      });
    }, [antdTheme, themeState, prefixCls, defaultCustomTheme]);

    //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
    if (!styledTheme || Object.keys(styledTheme).length === 0) {
      return initTheme;
    }
    return styledTheme;
  };
};