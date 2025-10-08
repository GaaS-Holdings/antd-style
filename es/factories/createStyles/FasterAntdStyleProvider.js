import React from 'react';
import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs';
import { useTheme } from "../../functions";
import { useMediaQueryMap } from "./response";
import { jsx as _jsx } from "react/jsx-runtime";
export var FasterAntdStyleContext = /*#__PURE__*/React.createContext({});
export var FasterAntdStyleProvider = function FasterAntdStyleProvider(_ref) {
  var children = _ref.children,
    layer = _ref.layer;
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
  var content = /*#__PURE__*/_jsx(FasterAntdStyleContext.Provider, {
    value: contextValue,
    children: children
  });
  if (layer) {
    return /*#__PURE__*/_jsx(AntdStyleProvider, {
      layer: layer,
      children: content
    });
  }
  return content;
};