"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FasterAntdStyleProvider = exports.FasterAntdStyleContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _functions = require("../../functions");
var _response = require("./response");
var _jsxRuntime = require("react/jsx-runtime");
var FasterAntdStyleContext = exports.FasterAntdStyleContext = /*#__PURE__*/_react.default.createContext({});
var FasterAntdStyleProvider = exports.FasterAntdStyleProvider = function FasterAntdStyleProvider(_ref) {
  var children = _ref.children;
  var theme = (0, _functions.useTheme)();
  var responsiveMap = (0, _response.useMediaQueryMap)();
  var contextValue = {
    cache: {},
    theme: theme,
    responsiveMap: responsiveMap
  };
  window.FasterAntdStyleWorkaround = {
    contextValue: contextValue
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(FasterAntdStyleContext.Provider, {
    value: contextValue,
    children: children
  });
};