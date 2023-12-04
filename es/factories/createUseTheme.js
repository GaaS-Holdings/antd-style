import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { useContext, useMemo } from 'react';
import { DEFAULT_THEME_CONTEXT } from "../functions/setupStyled";
import { useAntdTheme } from "../hooks/useAntdTheme";
import { useThemeMode } from "../hooks/useThemeMode";
export var createUseTheme = function createUseTheme(options) {
  return function () {
    var StyleEngineContext = options.StyleEngineContext;
    var _useContext = useContext(StyleEngineContext),
      StyledThemeContext = _useContext.StyledThemeContext,
      CustomThemeContext = _useContext.CustomThemeContext,
      prefixCls = _useContext.prefixCls;
    var antdTheme = useAntdTheme();
    var themeState = useThemeMode();
    var defaultCustomTheme = useContext(CustomThemeContext);
    var styledTheme = useContext(StyledThemeContext !== null && StyledThemeContext !== void 0 ? StyledThemeContext : DEFAULT_THEME_CONTEXT) || {};
    var initTheme = useMemo(function () {
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