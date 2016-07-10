"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ReactComponentWithPureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _DraggableMixin = require("./DraggableMixin");

var _DraggableMixin2 = _interopRequireDefault(_DraggableMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map = _react2.default.createClass({
  displayName: "Map",


  mixins: [_DraggableMixin2.default, _ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    x: _react2.default.PropTypes.number.isRequired,
    y: _react2.default.PropTypes.number.isRequired,
    backgroundColor: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      x: 0,
      y: 0,
      backgroundColor: "transparent",
      className: ""
    };
  },
  updatePosition: function updatePosition(clientX, clientY) {
    var rect = this.state.rect;


    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    this.props.onChange(this.getScaledValue(x), this.getScaledValue(y));
  },
  render: function render() {
    var classes = (0, _classnames2.default)("map", this.props.className, { active: this.state.active });
    var backgroundColor = this.props.backgroundColor;

    return _react2.default.createElement(
      "div",
      {
        className: classes,
        onMouseDown: this.startUpdates,
        onTouchStart: this.startUpdates
      },
      _react2.default.createElement("div", { className: "background", style: { backgroundColor: backgroundColor } }),
      this.state.rect && _react2.default.createElement("div", { className: "pointer", style: {
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        } })
    );
  }
});

exports.default = Map;