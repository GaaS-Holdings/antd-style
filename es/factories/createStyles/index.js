import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["stylish", "appearance", "isDarkMode", "prefixCls"],
  _excluded2 = ["prefixCls"];
import { useContext } from 'react';
import { createCSS, serializeCSS } from "../../core";
import { isReactCssResult, classnames } from "../../utils";
import { FasterAntdStyleContext } from "./FasterAntdStyleProvider";
import { convertResponsiveStyleToString } from "./response";
var generateStyles = function generateStyles(_ref) {
  var props = _ref.props,
    theme = _ref.theme,
    styleOrGetStyle = _ref.styleOrGetStyle,
    responsiveMap = _ref.responsiveMap,
    cx = _ref.cx,
    toClassName = _ref.toClassName;
  var styles = function () {
    var tempStyles;
    if (styleOrGetStyle instanceof Function) {
      var stylish = theme.stylish,
        appearance = theme.appearance,
        isDarkMode = theme.isDarkMode,
        _prefixCls = theme.prefixCls,
        token = _objectWithoutProperties(theme, _excluded);

      // @ts-ignore
      var responsive = function responsive(styles) {
        return convertResponsiveStyleToString(styles, responsiveMap);
      };
      Object.assign(responsive, responsiveMap);
      tempStyles = styleOrGetStyle({
        token: token,
        stylish: stylish,
        appearance: appearance,
        isDarkMode: isDarkMode,
        prefixCls: _prefixCls,
        cx: cx,
        css: serializeCSS,
        responsive: responsive
      }, props);
    } else {
      tempStyles = styleOrGetStyle;
    }
    if (_typeof(tempStyles) === 'object') {
      if (isReactCssResult(tempStyles)) {
        tempStyles = toClassName(tempStyles);
      } else {
        tempStyles = Object.fromEntries(Object.entries(tempStyles).map(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];
          if (_typeof(value) === 'object') {
            return [key, toClassName(value)];
          }
          return [key, value];
        }));
      }
    }
    return tempStyles;
  }();
  var prefixCls = theme.prefixCls,
    res = _objectWithoutProperties(theme, _excluded2);
  return {
    styles: styles,
    cx: cx,
    theme: res,
    prefixCls: prefixCls,
    fastCx: classnames
  };
};
var createStylesCallsCounter = 0;
export var createStylesFactory = function createStylesFactory(_ref4) {
  var hashPriority = _ref4.hashPriority,
    EmotionContext = _ref4.EmotionContext;
  return function (styleOrGetStyle, options) {
    var globalBaseCacheKey = createStylesCallsCounter++;
    return function (props) {
      var globalCacheKey = "".concat(globalBaseCacheKey, "-").concat(JSON.stringify(props));
      var fasterAntdStyleContext = useContext(FasterAntdStyleContext);
      var theme = fasterAntdStyleContext.theme,
        responsiveMap = fasterAntdStyleContext.responsiveMap;
      var _useContext = useContext(EmotionContext),
        cache = _useContext.cache;
      var _createCSS = createCSS(cache, {
          hashPriority: (options === null || options === void 0 ? void 0 : options.hashPriority) || hashPriority,
          label: options === null || options === void 0 ? void 0 : options.label
        }),
        cx = _createCSS.cx,
        toClassName = _createCSS.css;
      if (!fasterAntdStyleContext.cache[globalCacheKey]) {
        var styles = generateStyles({
          props: props,
          theme: theme,
          styleOrGetStyle: styleOrGetStyle,
          responsiveMap: responsiveMap,
          cx: cx,
          toClassName: toClassName
        });
        fasterAntdStyleContext.cache[globalCacheKey] = styles;
      }
      var result = fasterAntdStyleContext.cache[globalCacheKey];
      return result;
    };
  };
};