import React from 'react';
import { useTheme } from "../../functions";
import { useMediaQueryMap } from "./response";
import { jsx as _jsx } from "react/jsx-runtime";
export var FasterAntdStyleContext = /*#__PURE__*/React.createContext({});
export var FasterAntdStyleProvider = function FasterAntdStyleProvider(_ref) {
  var children = _ref.children;
  var theme = useTheme();
  var responsiveMap = useMediaQueryMap();
  var contextValue = {
    cache: {},
    theme: theme,
    responsiveMap: responsiveMap
  };
  window.FasterAntdStyleWorkaround = {
    contextValue: contextValue
  };
  return /*#__PURE__*/_jsx(FasterAntdStyleContext.Provider, {
    value: contextValue,
    children: children
  });
};