export var createAntdStylish = function createAntdStylish(_ref) {
  var css = _ref.css,
    token = _ref.token;
  return {
    buttonDefaultHover: css({
      backgroundColor: token.colorBgContainer,
      border: "1px solid ".concat(token.colorBorder),
      cursor: 'pointer',
      ':hover': {
        color: token.colorPrimaryHover,
        borderColor: token.colorPrimaryHover
      },
      ':active': {
        color: token.colorPrimaryActive,
        borderColor: token.colorPrimaryActive
      }
    })
  };
};