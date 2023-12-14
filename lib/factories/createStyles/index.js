"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStylesFactory = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = require("react");
var _core = require("../../core");
var _utils = require("../../utils");
var _FasterAntdStyleProvider = require("./FasterAntdStyleProvider");
var _response = require("./response");
var _excluded = ["stylish", "appearance", "isDarkMode", "prefixCls"],
  _excluded2 = ["prefixCls"];
var fastCx = function fastCx() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (0, _utils.classnames)(args);
};
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
        token = (0, _objectWithoutProperties2.default)(theme, _excluded);

      // @ts-ignore
      var responsive = function responsive(styles) {
        return (0, _response.convertResponsiveStyleToString)(styles, responsiveMap);
      };
      Object.assign(responsive, responsiveMap);
      tempStyles = styleOrGetStyle({
        token: token,
        stylish: stylish,
        appearance: appearance,
        isDarkMode: isDarkMode,
        prefixCls: _prefixCls,
        cx: cx,
        css: _core.serializeCSS,
        responsive: responsive
      }, props);
    } else {
      tempStyles = styleOrGetStyle;
    }
    if ((0, _typeof2.default)(tempStyles) === 'object') {
      if ((0, _utils.isReactCssResult)(tempStyles)) {
        tempStyles = toClassName(tempStyles);
      } else {
        tempStyles = Object.fromEntries(Object.entries(tempStyles).map(function (_ref2) {
          var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];
          if ((0, _typeof2.default)(value) === 'object') {
            return [key, toClassName(value)];
          }
          return [key, value];
        }));
      }
    }
    return tempStyles;
  }();
  var prefixCls = theme.prefixCls,
    res = (0, _objectWithoutProperties2.default)(theme, _excluded2);
  return {
    styles: styles,
    cx: cx,
    theme: res,
    prefixCls: prefixCls,
    fastCx: fastCx
  };
};
var createStylesCallsCounter = 0;
var createStylesFactory = exports.createStylesFactory = function createStylesFactory(_ref4) {
  var hashPriority = _ref4.hashPriority,
    EmotionContext = _ref4.EmotionContext;
  return function (styleOrGetStyle, options) {
    var globalBaseCacheKey = createStylesCallsCounter++;
    return function (props) {
      var globalCacheKey = "".concat(globalBaseCacheKey, "-").concat(JSON.stringify(props));
      var fasterAntdStyleContextReal = (0, _react.useContext)(_FasterAntdStyleProvider.FasterAntdStyleContext);
      var fasterAntdStyleContext = fasterAntdStyleContextReal.cache ? fasterAntdStyleContextReal : window.FasterAntdStyleWorkaround.contextValue;
      var theme = fasterAntdStyleContext.theme,
        responsiveMap = fasterAntdStyleContext.responsiveMap;
      var _useContext = (0, _react.useContext)(EmotionContext),
        cache = _useContext.cache;
      var _createCSS = (0, _core.createCSS)(cache, {
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